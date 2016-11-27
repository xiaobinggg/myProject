require.config({
	baseUrl:'',
	paths:{
		'jquery':'../../js/common/jquery-1.7.2',
		'common':'../../js/common'
	},shim:{
		'common/kdTree':{
			exports: 'kdTree'
		}
	}
});

//地图对象
var _MapApp;
var kdtree;
var mouseovertimeout = 0;
var mousepos = new Object();


require(['jquery','common/kdTree','common/KdTreeExtend'], function ($,kdTree,kdTreeExtend){
	var markers = policedata.rows['01'];
	alert(markers.length);
	kdtree = new kdTree(markers,kdTreeExtend.distance, ["latitude", "longitude"]);
	//alert(kdtree.root.obj.devicename);
	//绑定事件
	document.getElementById("map").onmousemove = handleMouseover;
    /*$("#map").mousemove(function(){
        handleMouseover();
    });*/
});

function handleMouseover(){
	window.clearTimeout(mouseovertimeout);
	document.getElementById("map").style.cursor = "";
	var e = window.event;
	mousepos.clientX = e.clientX;
	mousepos.clientY = e.clientY;
	
	mouseovertimeout = setTimeout(function(){
		console.log("fired");
		var screenpos = getMousePosition(mousepos);
		var x = screenpos.x;
		var y = screenpos.y;
		var pCenterLatLng = _MapApp.getCenterLatLng();
		xpos = pCenterLatLng.x + (x - getMap().viewSize.width / 2) / _PixelsPerDegree[_MapApp.getZoomLevel()].x;
		ypos = pCenterLatLng.y - (y - getMap().viewSize.height / 2) / _PixelsPerDegree[_MapApp.getZoomLevel()].y;

		var obj = new Point(xpos,ypos);
		obj.longitude = xpos;
		obj.latitude = ypos;
		var hotspot = kdtree.nearest(obj,1);
		var xdegree = 12/_PixelsPerDegree[_MapApp.getZoomLevel()].x;
		var ydegree = 12/_PixelsPerDegree[_MapApp.getZoomLevel()].y;
		var obj1 = new Point(obj.longitude + xdegree,obj.latitude + ydegree);
		var distance =  GetDistanceInLL(obj,obj1);
		//obj1.longitude = obj.longitude + xdegree;
		//obj1.latitude = obj.latitude + ydegree;
		
		
		if(hotspot!=null && hotspot[0][1]<distance){
			console.log(distance);
			document.getElementById("map").style.cursor = "hand";

			/*var marker = hotspot[0][0];
			var point = new Point(marker.longitude,marker.latitude);
			var pTitle = new Title(marker.devicename, 13, 7, "Microsoft YaHei", "#000000","#FFFFFF",'#FFFFFF', 1, "true");
			var pIcon = new Icon();
			pIcon.width = 24; 
			pIcon.height = 24;
			pIcon.image = "policeIcon.png";
			var newmarker = new Marker(point, pIcon, pTitle);
			newmarker.hideTitle();
			_MapApp.addOverlay(newmarker);*/
		}
	},10);
	
}
  
/**获得当前鼠标的屏幕坐标*/
function getMousePosition(e){
	 var mousePosition={x:0,y:0};
	 var x,y;
	 var e = e||window.event;
	 mousePosition.x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
	 mousePosition.y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
	 
	 return mousePosition;
	
}  
//加载模块js对应的文件
function loadmodule(modulepath,modulename,callback){
	require([modulepath+'/'+modulename],function(module){
		window[modulename] = module;
      window.parent.window[modulename] = module;
		callback.call(module);
	});
}
  