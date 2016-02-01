(function () {

    //空方法
    function noop(){}

    var HiPoint = function(x,y){};


    var IHiMap = function (mapobj) {};

    /**********************地图操作**************************/

    IHiMap.prototype.zoomIn = noop;
    IHiMap.prototype.zoomOut = noop;
    IHiMap.prototype.fullExtent = noop;
    IHiMap.prototype.measureLength= noop;
    IHiMap.prototype.measureArea= noop;

    /**
     * 地图定位，同 moveTo
     * @param {(String|HiPoint)} strCoords 地图中心点
     * @param {Number} [zoomlevel]	地图显示级别
     * @return {IHiMap}
     */
    IHiMap.prototype.centerAndZoom = function (strCoords,zoomlevel){};
    
    /**
     * 地图定位，同 centerAndZoom
     * @param {(String|HiPoint)} strCoords 地图中心点
     * @param {Number} [zoomlevel]	地图显示级别
     * @return {IHiMap}
     */
    IHiMap.prototype.moveTo = function (strCoords,zoomlevel){};

    /**
     * 设置地图中心点
     * @param {(String|HiPoint)} strCoords
     * @return {IHiMap}
     */
    IHiMap.prototype.setCenter = function (strCoords) {};


    /**
     * 画点
     * @param {function(String)} [callback] 回调函数
     * @return {IHiMap}
     */
    IHiMap.prototype.drawPoint = function (callback) {};

    /**
     * 画矩形
     * @param {function(String)} [callback] 回调函数
     * @return {IHiMap}
     */
    IHiMap.prototype.drawRect = function (callback) {};

    /**
    * 画圆
    * @param {function(String)} [callback] 回调函数
    * @return {IHiMap}
    */
    IHiMap.prototype.drawCircle = function (callback) {};

    /**
     * 画线
     * @param {function(String)} [callback] 回调函数
     * @return {IHiMap}
     */
    IHiMap.prototype.drawPolyline = function (callback) {};

    /**
     * 画多边形
     * @param {function(String)} [callback] 回调函数
     * @return {IHiMap}
     */
    IHiMap.prototype.drawPolygon = function (callback) {};

    /**
     * 清空地图
     * @return {IHiMap}
     */
    IHiMap.prototype.clearMap = function () {};


    /************信息叠加接口**************/


    //缓存所有设备点位
    IHiMap.prototype.getAllMonitor = function (devicetypes, callback) {


    }

    //缓存所有设施点位
    IHiMap.prototype.getAllFaciMonitor = function (facitypes, callback) {


    }


    /**
     *显示一个设备图标
     */
    IHiMap.prototype.showDevice = function (deviceid, devicetype, centerable) {


    }


    /**
     *显示一个设施点图标
     */
    IHiMap.prototype.showFaciMonitor = function (monitor) {


    }

    /**
     *显示一个设施线图标
     */
    IHiMap.prototype.showFaciLine = function (monitor) {


    }

    //删除一个设施点
    IHiMap.prototype.removeFaci = function (monitor) {

    }

    /**根据xml展示自定义点,xml格式：
     *<marker id='...'>                    id 为marker 的唯一标识
     *    <title>..</title>                标题
     *    <x>...</x>                        经度
     *    <y>...</y>                        纬度
     *    <templateid>..</templateid>        模板编号，决定marker的图标和弹出信息窗的内容，在IHiMapConfig.js 文件中定义
     *    <centable></centable>            是否居中显示，值为true或false。默认为false
     *   <showtitle></showtitle>            是否始终展示标题
     *    <markerinfo>
     *        <...>                        自定义的内容
     *    </markerinfo>
     *</marker>
     */
    IHiMap.prototype.showMonitorByXML = function (strxml) {

    }

    IHiMap.prototype.removeMonitor = function (id) {

    };

    //显示自定义点
    IHiMap.prototype.showMonitor = function (strcoords, title, imgurl, width, height, infowindow, centable, titlebgcolor, showtitle, titlecolor) {

    }


    //同时显示多个地图元素
    IHiMap.prototype.showMuliObj = function (markers, callback) {

    }

    //删除多个地图元素,根据模板名称
    IHiMap.prototype.removeMuliObj = function (templateid) {

    }

    //根据模板获得弹出信息窗的内容
    function getOpenInfoByTemplate(templateid, data) {

    }


    //删除设备
    IHiMap.prototype.removeDevice = function (deviceid, devicetype) {

    }

    function getMonitorById(deviceid, devicetype) {

    }


    //同时显示多个设备,按需加载，只展示视野范围内的设备
    IHiMap.prototype.showMultDevice = function (markerArr, callback, id) {

    }


    /**显示一条线
     *strCoords 坐标点集合
     *infohtml 点击弹出信息框的内容
     *color 线的颜色
     *weight 线的宽度
     *opacity 透明度
     *arrow 线的方向 0：无方向（默认）；1：为正方向；-1：为负方向
     *linestyle 线形 "none","dash","dashdot","dot","longdash","longdashdot","shortdash","shortdashdot","shortdashdotdot","longdashdotdot","shortdot"
     *centable 是否居中，默认居中
     */
    IHiMap.prototype.showPolyline = function (strCoords, infohtml, color, weight, opacity, arrow, linestyle, centable) {

    }
//删除线
    IHiMap.prototype.removePolyline = function (strCoords) {

    }


    /**显示矩形
     *strCoords 坐标点
     *infohtml 点击弹出信息框的内容
     *color 边框颜色
     *weight 边框宽度
     *opacity 透明度
     *fillcolor 填充颜色
     *centable 是否居中，默认居中
     */
    IHiMap.prototype.showRect = function (strCoords, infohtml, color, weight, opacity, fillcolor, centable) {

    }
//删除矩形
    IHiMap.prototype.removeRect = function (strCoords) {

    }

    /**显示多边形
     *strCoords 坐标点集合
     *infohtml 点击弹出信息框的内容
     *color 边框颜色
     *weight 边框宽度
     *opacity 透明度
     *fillcolor 填充颜色
     *centable 是否居中，默认居中 true
     */
    IHiMap.prototype.showPolygon = function (strCoords, infohtml, color, weight, opacity, fillcolor, centable) {

    }

//删除多边形
    IHiMap.prototype.removePolygon = function (strCoords) {

    }

    /**
     * 波纹效果
     *strCoords 中心点
     *radius 半径
     */
    IHiMap.prototype.showWave = function (strCoords, radius) {
    }

    /**显示圆
     *strCoords 坐标点集合
     *infohtml 点击弹出信息框的内容
     *color 边框颜色
     *weight 边框宽度
     *opacity 透明度
     *fillcolor 填充颜色
     *centable 是否居中，默认居中 true
     */
    IHiMap.prototype.showCircle = function (strCoords, infohtml, color, weight, opacity, fillcolor, centable) {

    }

//删除圆
    IHiMap.prototype.removeCircle = function (strCoords) {

    }


    /************信息查询接口**************/

        //点查询

    IHiMap.prototype.queryPoint = function (strCoords, callback) {

    }
    /**点周边查询
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *distance 周边距离 单位米
     *callback 回调函数
     */
    IHiMap.prototype.queryByPoint = function (strCoords, devicetype, distance, callback) {

    }
    /**线周边查询
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *distance 周边距离 单位米
     *callback 回调函数
     */
    IHiMap.prototype.queryByLine = function (strCoords, devicetype, distance, callback) {

    }
    /**线周边查询,并按到起点的顺序排序
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *distance 周边距离 单位米
     *callback 回调函数
     */
    IHiMap.prototype.queryByLineOrderByStart = function (strCoords, devicetype, distance, callback) {

    }
    /**矩形内部查询
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *callback 回调函数
     */
    IHiMap.prototype.queryByRect = function (strCoords, devicetype, callback) {


    }

    /**多边形内部查询
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *callback 回调函数
     */
    IHiMap.prototype.queryByPolygon = function (strCoords, devicetype, callback) {

    }
    /**圆形内部查询
     *strCoords 坐标点
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *callback 回调函数
     */
    IHiMap.prototype.queryByCircle = function (strCoords, devicetype, callback) {

    }

    /**按照给定的sql语句进行查询
     *sql 查询语句中的参数，"#"分割
     *callback 回调函数
     */
    IHiMap.prototype.queryBySQL = function (sql, callback) {


    }


    /**
     *路段查询
     *strCoords    坐标点
     *querytype    "queryByPoint" 点周边查询,  "queryByLine" 线周边查询,  "queryByRect" 矩形内部查询,
     *            "queryByPolygon" 多边形内部查询, "queryByCircle" 圆形内部查询
     *distance    搜索距离，内部查询该字段留空
     *callback    回调函数，返回搜索到的路段
     */

    IHiMap.prototype.queryRoad = function (strCoords, querytype, distance, callback) {

    }
    /**
     *根据指定的路段集合筛选出视野范围内的路段
     *zoomlevel 地图显示级别
     */
    IHiMap.prototype.queryRoadInBounds = function (roadArr) {

    }


    /**画点查询
     *devicetype 要查询的设备类型,逗号分隔,如: "01,13,19"
     *distance 查询距离
     *callback 回调函数
     */
    IHiMap.prototype.queryByDrawPoint = function (devicetype, distance, callback) {
        this.drawPoint(function (strCoords) {
            this.queryByPoint(strCoords, devicetype, distance, callback);
        });
    }
//画线查询
    IHiMap.prototype.queryByDrawLine = function (devicetype, distance, callback) {
        this.drawPolyline(function (strCoords) {
            this.queryByLine(strCoords, devicetype, distance, callback);
        });
    }
//画多边形查询
    IHiMap.prototype.queryByDrawRect = function (devicetype, distance, callback) {
        this.drawPolyline(function (strCoords) {
            this.queryByRect(strCoords, devicetype, distance, callback);
        });
    }
//拉框查询
    IHiMap.prototype.queryByDrawPolygon = function (devicetype, distance, callback) {
        this.drawPolyline(function (strCoords) {
            this.queryByPolygon(strCoords, devicetype, distance, callback);
        });
    }
//画圆查询
    IHiMap.prototype.queryByDrawCircle = function (devicetype, distance, callback) {
        this.drawPolyline(function (strCoords) {
            this.queryByCircle(strCoords, devicetype, distance, callback);
        });
    }

//查询所有的GPS设备
    IHiMap.prototype.queryAllGPS = function (callback) {


    }

//判断两个坐标点之间的距离 单位米
    IHiMap.prototype.getDistanceInLL = function (str1, str2) {

    }

//将米转换成经纬度
    IHiMap.prototype.changeMeterToDegree = function (strCoords, distance) {

    }

    /**轨迹回放
     *ioverlay 轨迹回放的图层
     *strCoords 轨迹,如:"116.3,39.4,116.5,39.4"
     *start 开始节点
     *end 结束节点
     *devicetype 设备类型
     */
    IHiMap.prototype.startPlay = function (ioverlay, strCoords, startindex, endindex, timeInterval) {


    }

    function playStep(ioverlay) {

    }

    /**暂停轨迹回放
     *ioverlay 轨迹回放的图层
     */
    IHiMap.prototype.stopPlay = function (ioverlay) {

    }
    /**继续轨迹回放
     *ioverlay 轨迹回放的图层
     */
    IHiMap.prototype.resetPlay = function (ioverlay) {

    }

    /**调整轨迹回放速度
     *ioverlay 轨迹回放的图层
     *interval 轨迹回放的速度
     */
    IHiMap.prototype.resetTimeInterval = function (ioverlay, interval) {

    }


    /**轨迹回放过程中跳转到指定位置
     *ioverlay 轨迹回放的图层
     */
    IHiMap.prototype.jumpTo = function (ioverlay, index) {

    }

    /**清除地图上的轨迹回放
     *ioverlay 轨迹回放的图层
     */
    IHiMap.prototype.clearPlay = function (ioverlay) {


    }

    /**地图打印方法
     *urlCSS 是否添加页眉页脚
     *strTitle 页眉文字内容
     *strBottom 页脚文字内容
     *
     */
    IHiMap.prototype.printmap = function (urlCSS, strTitle, strBottom) {

    }


    /********************信息编辑接口**************/
    IHiMap.prototype.addPoint = function (deviceid, callback) {

    }
    IHiMap.prototype.addLine = function (deviceid, callback) {

    }

    IHiMap.prototype.addPoly = function (deviceid, callback) {

    }

    IHiMap.prototype.editPoint = function (deviceid, callback) {

    }
    IHiMap.prototype.editLine = function (deviceid, callback) {

    }

    IHiMap.prototype.editPoly = function (deviceid, callback) {

    }

    IHiMap.prototype.delPoint = function (deviceid, callback) {

    }
    IHiMap.prototype.delLine = function (deviceid, callback) {

    }

    IHiMap.prototype.delPoly = function (deviceid, callback) {

    }


//计算视野范围内的所有安装点
    IHiMap.prototype.genCurrMarkers = function () {

    }


    this.IHiMap = IHiMap;

    if (typeof exports !== 'undefined') {
        exports.IHiMap = IHiMap;
    }
})();


/**
 *
 * @param {String} str aaaa
 * @param {Number}num
 * @returns {string}
 */
var doSomething = function(str,num){
    return "ddd"

}

doSomething("aaa",1);



