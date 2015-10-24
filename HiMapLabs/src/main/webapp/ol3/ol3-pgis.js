//地图对象
var _MapApp;
require.config({
    baseUrl : '',
    paths:{
        'jquery':'../js/common/jquery-1.7.2'
    }
});

require(['jquery','HiMaps1.0'], function ($,himap){
    _MapApp = new HiMap("map");
    //_MapApp.setCenter("120.35595, 36.07525");
    //_MapApp.moveTo("120.35595, 36.07525",4);

    //画点测试
    _MapApp.drawCircle(function(pos){
        alert(pos);
    });
});


//加载模块js对应的文件
function loadmodule(modulepath,modulename,callback){
    require([modulepath+'/'+modulename],function(module){
        window[modulename] = module;
        window.parent.window[modulename] = module;
        callback.call(module);
    });
}