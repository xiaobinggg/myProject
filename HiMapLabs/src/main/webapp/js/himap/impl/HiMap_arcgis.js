require.config({
    baseUrl: '',
    paths: {
        'jquery': '../../common/jquery-1.7.2',
        'IHiMap': '../../himap/IHiMap'
    }, shim: {
        'IHiMap': {exports: 'IHiMap'}
    }
});

define(["jquery", "IHiMap",
		"esri/map", "esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer",
        "esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleFillSymbol",
        "esri/graphic","esri/InfoTemplate",
        "dojo/dom", "dojo/on", "dojo/domReady!"
], function ($, IHiMap,
            Map, Point,ArcGISTiledMapServiceLayer,
            PictureMarkerSymbol,SimpleFillSymbol,
            Graphic,InfoTemplate,
            dom, on
) {


//××××××××××××××××××××××××××方法内部定义开始×××××××××××××××××××××××××××

    var HiMap = function (mapdiv,mapInitParams) {
		this.base = IHiMap;
		this.base();
		this.map = new Map(mapdiv,mapInitParams);
        var MyTiledMapServiceLayer = new ArcGISTiledMapServiceLayer(mapurl);
        map.addLayer(MyTiledMapServiceLayer);
    };

    HiMap.prototype = new IHiMap();

	/**
	 * 地图定位
	 * @param {(String|HiPoint)} strCoords 地图中心点
	 * @param {Number} [zoomlevel]	地图显示级别
	 * @return {HiMap}
	 */
	this.centerAndZoom  = function(latLng, zoomLevel){
		var point = new Point(latLng.split(","));
		this.map.centerAndZoom(point,zoomlevel);
		return this;
	};


    //××××××××××××××××××××××××××方法内部定义结束×××××××××××××××××××××××××××


    //外部调用接口
    return {}

});
	



