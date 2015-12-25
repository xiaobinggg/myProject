
	
	//××××××××××××××××××××××××××方法内部定义开始×××××××××××××××××××××××××××
	var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
	var WMSTileLayer = function(name,url,params,options){
		var basename = "tilewms";
		//默认wms参数
		var baseparams = {
			layers: 'sde:sectionstatus',
			srs:'EPSG:4326',
			transparent: true,
			cql_filter:''
		}
		//默认图层参数
		var baseoptions ={
			transitionEffect: "resize" ,
            singleTile: false,
            isBaseLayer: false
		}
		this.name = name || basename;
		this.params = $.extend(baseparams,params);
		this.options = $.extend(baseoptions,options);
		this.url = url +"?layers="+this.params.layers+"&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS="+this.params.srs+"&WIDTH=256&HEIGHT=256";
		
	}
	
	WMSTileLayer.prototype.show = function(){
		if(typeof(_MapApp)=='undefined'){
			return;
		}
		var tilesBox = this.getTilesBox();

		var ppd = getPixesPerDegree();
		for(var i=0;i<tilesBox.length;i++){
			var bbox = tilesBox[i];
			var nodes = getNodesByBBox(bbox);
			var left = (nodes.startpoint.x-_MapApp.getBoundsLatLng().minX)*ppd.x;
			var top = (_MapApp.getBoundsLatLng().maxY-nodes.startpoint.y  )*ppd.y;
			var div = document.createElement("img");
			div.src = this.url +"&BBOX="+bbox;
			div.style.width = "256px";
        	div.style.height = "256px";
        	//div.style.left = left+"px";
			top = -180;
        	//div.style.top = top+"px";
			div.style.position = "absolute";
			div.style.zIndex = 10;
        	document.getElementById("map").appendChild(div);
		}
	}
	WMSTileLayer.prototype.getTilesBox = function(zoomlevel){
		var result = new Array();
		var ppd = getPixesPerDegree();
		var x = Math.log(ppd.x)/Math.log(2);
		ppd.x = ppd.y = 1/resolutions[x];
		var tilelon = 256/ppd.x;
		var tilelat = 256/ppd.y;

		var mbr = _MapApp.getBoundsLatLng();
		var i;
		var leftlon = -180;
		var leftlat = 90;
		for(i=0;i<360/tilelon;i++){
			if(leftlon+tilelon>mbr.minX){
				break;
			}
			leftlon+=tilelon;
		}
		for(i=0;i<180/tilelat;i++){
			if(leftlat-tilelat<mbr.maxY){
				break;
			}
			leftlat-=tilelat;
		}
		result.push(leftlon+","+(leftlat-tilelat)+","+(leftlon+tilelon)+","+leftlat);

		return result;
	}
	
	function getPixesPerDegree(){
		var ppd = {};
		if( typeof(_PixelsPerDegree) == "undefined"){
			ppd.x =_MapApp.map.baseLayer.tileInfo.levelDetails[_MapApp.map.realZoomLevel].resolution;
        	ppd.y = _MapApp.map.baseLayer.tileInfo.levelDetails[_MapApp.map.realZoomLevel].resolution;
		}else{
			ppd.x = _PixelsPerDegree[_MapApp.getZoomLevel()].x;
			ppd.y = _PixelsPerDegree[_MapApp.getZoomLevel()].y;
		}
		return ppd;
	}
	
	function getNodesByBBox(bbox){
		var result = {};
		var points = bbox.split(",");
		if(points.length!=4){
			return null;
		}
		var startpoint = {},endpoint = {};
		startpoint.x = points[0];
		startpoint.y = points[3];
		endpoint.x = points[2];
		endpoint.y = points[1];
		result.startpoint = startpoint;
		result.endpoint = endpoint;
		return result;
		
	}
	
	//××××××××××××××××××××××××××方法内部定义结束×××××××××××××××××××××××××××