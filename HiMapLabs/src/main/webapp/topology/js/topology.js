
var map;
var zoomify; 
var roadstatuslayer;
var roadstatusinterval;
var newsinterval;
var zoomify_width = 800;
var zoomify_height = 800; 
var initshowlevel = 2;
var rooturl = document.URL.split( "/" )[0]+"/"+ document.URL.split( "/" )[1]+"/"+ document.URL.split( "/" )[2]+"/"+ document.URL.split( "/" )[3];
var zoomify_url = rooturl+"/topology/tilegroup/";

//保存鼠标的当前位置
function mouseMove(ev) 
{ 
	ev= ev || window.event; 
	var mousePos = mouseCoords(ev); 
	//alert(ev.pageX); 
	mousePosx = mousePos.x; 
	mousePosy = mousePos.y; 
} 

function mouseCoords(ev) 
{ 
	if(ev.pageX || ev.pageY){ 
		return {x:ev.pageX, y:ev.pageY}; 
	} 
	return { 
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
		y:ev.clientY + document.body.scrollTop - document.body.clientTop 
	}; 
} 

document.onmousemove = mouseMove; 


function init(){
	//地图图片
	zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", zoomify_url,
					new OpenLayers.Size( zoomify_width, zoomify_height) );
	/* Map with raster coordinates (pixels) from Zoomify image */
	var options = {
		controls: [
			//new OpenLayers.Control.MousePosition(),
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.ArgParser(),
			new OpenLayers.Control.Attribution()
			],
		maxExtent: new OpenLayers.Bounds(0, 0, zoomify_width, zoomify_height),
		minExtent: new OpenLayers.Bounds(0, 0, zoomify_width/2, zoomify_height/2),
		maxResolution: Math.pow(2, zoomify.numberOfTiers-1 ),
		numZoomLevels: zoomify.numberOfTiers,
        projection:'EPSG:2443',
		units: 'pixels'
	};



	map = new OpenLayers.Map("map", options);
	map.addLayer(zoomify);
  
	
	map.setBaseLayer(zoomify);
	map.setCenter(new OpenLayers.LonLat(zoomify_width/2,zoomify_height/2), initshowlevel);
}



