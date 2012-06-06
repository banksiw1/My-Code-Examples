var amfct = this.amfct || {};

amfct.PublishAlphas = function () {
    var that, domEvents, selectAllAlphas, msgPrompt, dataObject, ajaxRequest, validatePublishAlphas, formChanged;
    that = this;

    /*Dependencies*/
    msgPrompt = new amfct_utils.MessagePrompt();
    validatePublishAlphas = new amfct_utils.ValidationSummary();
    ajaxRequest = new amfct_utils.AjaxCalls();
    dataObject = new amfct_utils.DataConstructor();

    /*Private Functions*/
    domEvents = function () {
        that.container.find('form').submit(function () { return false; });
        that.publishBtn.bind('click', that.PublishSelectedAlphas);
        that.selectAll.delegate('a', 'click', selectAllAlphas);
	that.seasonInput.bind('keyup', function () { formChanged = true; });
    };
    selectAllAlphas = function (event) {
        event.preventDefault();
        if ($(this).attr('href') === '#selectAll') {
            $(this).parents('fieldset').find('input[type="checkbox"]').attr('checked', true);
        } else {
            $(this).parents('fieldset').find('input[type="checkbox"]').attr('checked', false);
        }
    };
    requestCallback = function () {
        msgPrompt.init('msg', 'loading', '<img src="/assets/images/core/ajax-loader.gif" alt="">', 'body', 'bottom');
    };
    publishSuccessCallback = function (response) {
		msgPrompt.TearDownMsg('#msg');
		msgPrompt.init('msg','publishing-successful', '<p>Alpha\'s have successfully been published</p>', 'body', 'top', true);
        that.dataRow.parents('#search-results').addClass('is-saved');
    };
    publishFailureCallback = function (jqXHR, textStatus, errorThrown) {
    	msgPrompt.TearDownMsg('#msg');
		msgPrompt.init('msg', 'publishing-unsuccessful', '<p>A system error has occured, Alpha\'s have not been published</p><a class="close" href="#close">Close</a>', 'body', 'bottom');
    };

    /*Public Functions*/
    this.init = function (container) {
        this.container = $(container);
        this.selectAll = this.container.find('.select-episodes');
        this.dataRow = this.container.find('.episode-details tbody tr');
		this.seasonInput = this.container.find('.season-no input');
      	this.publishBtn = $('#publish');
        domEvents();
    };
    this.PublishSelectedAlphas = function (event) {
        event.preventDefault();
        var validateAlphas, jsonData;
		validateAlphas =  validatePublishAlphas.init(that.dataRow, '<p>Please complete the missing fields for the AE number you are trying to submit(listed below) before clicking \'Publish\' again.</p>', formChanged);
        if (validatePublishAlphas.CheckAlphas()) {
            jsonData = dataObject.ParseFieldInputs(); 
            ajaxRequest.SendData('/Home/Publish', jsonData, requestCallback, publishSuccessCallback, publishFailureCallback);
		} else {
            return false;
        }
    };
};