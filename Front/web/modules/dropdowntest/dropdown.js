
define(["avalon", "bootstrap","text!./dropdown.html"], function(avalon,bootstrap,dropdown) {

    avalon.templateCache.dropdown = dropdown;
    var vm = avalon.define({
	    $id: "test",
	    
	})

    avalon.vmodels.root.page = "dropdown";

})