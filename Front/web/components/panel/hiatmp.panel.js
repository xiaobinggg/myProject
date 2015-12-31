/**
 * Created by liuxiaobing on 2015-12-30.
 */
define(["avalon","jquery","css!./hiatmp.panel.css"], function(avalon,$) {

    avalon.component("hi:panel", {
        $slot:"content",        
        content:"",
        $template: "<div>{{content|html}}</div>",
        $replace: 1,

        color:"default",

        $ready: function(vm, elem) {
            var root = avalon(elem)
            root.addClass("panel")
            root.addClass("panel-"+vm.color)
            normailize(elem.childNodes)
            $(".panel-heading > h1, .panel-heading > h2,.panel-heading > h3," +
                ".panel-heading > h4,.panel-heading > h5,.panel-heading > h6",
                elem).each(function (num,el) {
                    avalon(el).addClass("panel-title")                    
            })
            //console.log("panel构建完成")
        }
        
    })

    function normailize(elems){
        var divs=[]
        for(var i=0,el;el=elems[i++];){
            if(el.nodeType===1 && el.tagName==="DIV"){
                divs.push(el);
            }
        }
        switch(divs.length){
            case 1:
                avalon(divs[0]).addClass("panel-body")
                break
            case 2:
                avalon(divs[0]).addClass("panel-heading")
                avalon(divs[1]).addClass("panel-body")
                break
            case 3:
                avalon(divs[0]).addClass("panel-heading")
                avalon(divs[1]).addClass("panel-body")
                avalon(divs[2]).addClass("panel-footer")
                break
        }
    }

    return avalon;

});