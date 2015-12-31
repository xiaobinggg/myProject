//地图对象
var _MapApp;
var kdtree;
var mouseovertimeout = 0;
var mousepos = new Object();
require.config({
	baseUrl:'',
	paths: {
		'jquery':'../js/common/jquery-1.10.2',
		'bootstrap':'js/bootstrap.min'
　　　},shim: {
　　　　　'bootstrap':{
　　　　　　　　deps:['jquery']
　　　　　}
　　　}
});

require(['jquery','bootstrap'], function ($){
	$(function () {
	  $('[data-toggle="popover"]').popover()
	})
	
});

  
//加载模块js对应的文件
function loadmodule(modulepath,modulename,callback){
	require([modulepath+'/'+modulename],function(module){
		window[modulename] = module;
      window.parent.window[modulename] = module;
		callback.call(module);
	});
}
  