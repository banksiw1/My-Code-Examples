var amfct_utils = this.amfct_utils || {};
amfct_utils.AjaxCalls = function () {
	var that;
	that = this;
	/*Public Functions*/
	this.SendData = function (endPoint, data, requestCallBack, successCallBack, errorCallBack) {
		$.ajax({
                  type: 'POST',
                  url: endPoint,
                  cache: false,
                  contentType: 'application/json; charset=utf-8',
                  dataType: 'json',
                  data: data,
                  beforeSend: requestCallBack,
                  success: successCallBack,
                  error: errorCallBack
            });
	}
};
