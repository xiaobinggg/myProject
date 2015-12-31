/**
 * Created by liuxiaobing on 2015-12-25.
 */
require.config({
    paths:{
        avalon:"vendor/avalon/avalon.shim-1.5.5",
        jquery:"vendor/jquery/jquery-1.10.2.min",
        bootstrap:"vendor/bootstrap/js/bootstrap.min",
        text: 'vendor/require/text',
        css: 'vendor/require/cs',      
        domReady:"vendor/require/domReady"
    }
});

require(["avalon","jquery","domReady!"],function(avalon,$,domReady){

	avalon.log("加载avalon完毕，开始构建根VM与加载其他模块")
    avalon.templateCache.empty = " ";

    var vm = avalon.define({
        $id: "root",
        header: "empty",
        left: "empty",
        center:"empty",
        right:"empty"
    })

    avalon.scan(document.body);

    require(['./modules/leaderindex/leaderindex'], function() {//第三块，加载其他模块
        avalon.log("加载其他完毕")
    });



});