/**
 * Created by liuxiaobing on 2015-12-25.
 */
require.config({
    paths:{
        "avalon":"../../../library/avalon/avalon.shim",
        "domReady":"../../../library/require/domReady"
    }
});

require(["avalon","domReady!"],function(avalon,domReady){

    var vm = avalon.define({
        $id:"test",
        a:"bing"
    })
    avalon.scan(document.body);

});