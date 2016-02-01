/**
 * Created by liuxiaobing on 2016-1-18.
 */

/**********************业务调用区****************************/

/**大循环优化方法*/
function largeArrProcess(array,process,context){
    timeout = setTimeout(function(){
        if(array == null || array.length<=0){
            return;
        }
        var count=0;
        var showarray = new Array();
        while(count<10){
            if(array.length==0){
                break;
            }
            var item = array.shift();
            showarray.push(item.obj);
            count++;
        }
        process.call(context,showarray);
        if (array.length > 0){
            timeout = setTimeout(arguments.callee, 0);
        }else{
            //addLayerListener(devicetype);
        }
    }, 0);
}


//console.js
;(function(g) {
    'use strict';
    var _console = g.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

    var console = {version: '0.1.0'};
    var key;
    for(var i = 0, len = methods.length; i < len; i++) {
        key = methods[i];
        console[key] = function (key) {
            return function () {
                if (typeof _console[key] === 'undefined') {
                    return 0;
                }

                Function.prototype.apply.call(_console[key], _console, arguments);
            };
        }(key);
    }

    g.console = console;
}(window));

var triggerEvent = function(element,type,evt){
    var event;
    if(document.createEventObject){
        event = document.createEventObject();
        return element.fireEvent('on'+type,event);
    }else{
        event = document.createEvent("HTMLEvents");
        event.eventName = type;
        event.initEvent(type,false);
        event.button = evt.button;
        event.clientX = evt.clientX;
        event.clientY = evt.clientY;
        return element.dispatchEvent(event);
    }
}
