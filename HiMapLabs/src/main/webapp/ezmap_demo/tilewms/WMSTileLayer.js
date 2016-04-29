
	
	//××××××××××××××××××××××××××方法内部定义开始×××××××××××××××××××××××××××
	var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];

	//瓦片化专题图接口
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
		this.url = url +"&SRS=EPSG:4326&LAYERS="+this.params.layers+"&WIDTH=256&height=256&TRANSPARENT=true";
		if(this.params.cql_filter!=''){
			this.url +="&cql_filter"+escape(this.params.cql_filter);
		}
		this.divs = [];
		this.tilesBox = this.getTilesBox();

		var instance = this;
		this.lisfunc = function(){instance.reDraw()};
		_MapApp.addMapChangeListener(this.lisfunc);
		this.currLevel = _MapApp.getZoomLevel();
	}
	
	WMSTileLayer.prototype.show = function(){
		if(typeof(_MapApp)=='undefined'){
			return;
		}
		var ppd = getPixesPerDegree();

		var padding_top = _MapApp.map.div.style.top.replace("px","")-0;
		var padding_left = _MapApp.map.div.style.left.replace("px","")-0;
		for(var i=0;i<this.tilesBox.length;i++){
			var bbox = this.tilesBox[i];
			for(var m = 0; m<this.divs.length; m++){
				if(this.divs[m].bbox == bbox){
					continue;
				}
			}
			var nodes = getNodesByBBox(bbox);
			var left = (nodes.startpoint.x-_MapApp.getBoundsLatLng().minX)*ppd.x-padding_left;
			var top = (_MapApp.getBoundsLatLng().maxY-nodes.startpoint.y  )*ppd.y-padding_top;
			var div = document.createElement("img");
			div.bbox = bbox;
			div.src = this.url +"&BBOX="+bbox;
			div.style.width = "256px";
        	div.style.height = "256px";
        	div.style.left = left+"px";

        	div.style.top = top+"px";
			div.style.position = "absolute";
			div.style.zIndex = 10;
			_MapApp.map.div.appendChild(div);
			this.divs.push(div);
		}
	}
	WMSTileLayer.prototype.close = function(){
		for(var m = 0; m<this.divs.length; m++){
			$(this.divs[m]).remove();
		}
		this.tilesBox = [];
		var lisfunc= this.lisfunc;
		_MapApp.removeMapChangeListener(lisfunc);
	}

	WMSTileLayer.prototype.getTilesBox = function(zoomlevel){
		var result = new Array();
		var ppd = getPixesPerDegree();

		/*var level = Math.log(ppd.x)/Math.log(2);
		ppd.x = ppd.y = 1/resolutions[level];*/
		//alert(ppd.x);
		var tilelon = 256/ppd.x;
		var tilelat = 256/ppd.y;

		var mbr = _MapApp.getBoundsLatLng();
		var leftlon = -180;
		var leftlat = 90;
		while(leftlon<180){
			if(leftlon+tilelon>mbr.minX){
				break;
			}
			leftlon+=tilelon;
		}
		while(leftlat>-90){
			if(leftlat-tilelat<mbr.maxY){
				break;
			}
			leftlat-=tilelat;
		}
		while(leftlon<mbr.maxX){
			var ilat = leftlat;
			while(ilat>mbr.minY){
				result.push(leftlon+","+(ilat-tilelat)+","+(leftlon+tilelon)+","+(ilat));
				ilat-=tilelat;
			}
			leftlon+=tilelon;
		}
		result.push(leftlon+","+(leftlat-tilelat)+","+(leftlon+tilelon)+","+(leftlat));

		return result;
	}
	WMSTileLayer.prototype.reDraw = function(){
		if(_MapApp.getZoomLevel()!=this.currLevel){
			this.currLevel = _MapApp.getZoomLevel();
			for(var m = 0; m<this.divs.length; m++){
				$(this.divs[m]).remove();
			}
		}else{
			var mbr = _MapApp.getBoundsLatLng();
			for(var m = 0; m<this.divs.length; m++){
				var bbox = getNodesByBBox(this.divs[m].bbox);
				if(bbox.startpoint.x>=mbr.maxX || bbox.endpoint.x<=mbr.minX || bbox.endpoint.y>=mbr.maxY || bbox.startpoint.y<=mbr.minY){
					$(this.divs[m]).remove();
				}
			}
		}
		this.tilesBox = this.getTilesBox();
		this.show();
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
