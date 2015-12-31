define(["avalon","text!./avalon.button.html"], function(avalon,template) {

	avalon.component("hi:button", {
        $replace: 1,
        content:"按钮",
        $slot:"content",
        $ready: function(vm, elem) {
            console.log("BUTTON构建完成")
        },
        $template: template
    })

    return avalon;

});