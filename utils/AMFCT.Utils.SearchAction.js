var amfct_utils = this.amfct_utils || {};
amfct_utils.SearchAction = function () {
	var domEvents, searchAction, that;
	that = this;
	/*Private Functions*/
	domEvents = function () {
		$('#search_btn').bind('click', searchAction);
	};
	searchAction = function () {
		var result, newUrl;
		$.validity.start();
        $("#search_term").require();
        result = $.validity.end();
		if (result.valid) {
			newUrl = that.url.replace("ActionType", $('input[name=searchType]:checked').val()).replace("KEYWORD", $('#search_term').val());
            window.location = newUrl;
        }
	};
	
	/*Public Functions*/
	this.init = function (url) {
		this.url = url
		domEvents();
	};
};
