require.config({
    baseUrl: '',
    paths: {
        'jquery': '../../common/jquery-1.7.2',
        'IHiMap': '../../himap/IHiMap'
    }, shim: {
        'IHiMap': {exports: 'IHiMap'}
    }
});

define(['jquery', 'IHiMap'], function ($, IHiMap) {


//××××××××××××××××××××××××××方法内部定义开始×××××××××××××××××××××××××××

    var HiMap = function (mapobj) {

    };

    HiMap.prototype = new IHiMap();

    HiMap.prototype.setCenter = function (strcoords) {

    };

    HiMap.prototype.moveTo = function (strCoords, zoomlevel) {

    };

    HiMap.prototype.drawPoint = function (callback) {

    };
    HiMap.prototype.drawPolyline = function (callback) {

    };
    HiMap.prototype.drawPolygon = function (callback) {

    };
    HiMap.prototype.drawCircle = function (callback) {

    };
    HiMap.prototype.drawRect = function (callback) {

    };

    this.HiMap = HiMap;

    //××××××××××××××××××××××××××方法内部定义结束×××××××××××××××××××××××××××


    //外部调用接口
    return {}

});
	



