var amfct_utils = this.amfct_utils || {};
amfct_utils.FormHandler = function () {
	var that, domEvents, constructTextField, getTextAreaId, removePictureEditAttribute, updatePreviousAttribute,
	constructPrompt, constructCloseBtn;
	that = this;
	
	/*Dependencies*/
	var closePrompt = new amfct_utils.MessagePrompt();
	
	/*Private Functions*/
	domEvents = function () {
		that.dataRow.delegate('.add-picture-edit','click', constructTextField);
		that.dataRow.find('.remove').live('click', removePictureEditAttribute);
		that.dataRow.delegate('textarea','focus', constructCloseBtn);
		that.closeBtn.bind('click', constructPrompt);
		$('.close-screen').live('click', function () {
			window.location = '/';
		});
	};
	constructTextField = function (event) {
		var textFieldStr, getIdNum, idString, self;
		event.preventDefault();
		self = this;
		getIdNum = getTextAreaId(self);
		nameString = that.addPictureEditBtn.parent().find('textarea:first').attr('name')
		idString = that.addPictureEditBtn.parent().find('textarea:first').attr('id') + '_' + getIdNum;
		
		textFieldStr = '<div class="mandatory"><label for="' + idString +'">'+ nameString +'</label><textarea rows=1 class="picture-edit-attr" name="' + nameString + '"id="' + idString +'"></textarea><a class="remove" href="#remove">Remove</a></div>';
		$(this).before(textFieldStr);
	};
	getTextAreaId = function (obj) {
		var prevTextAreaId, idToIncrement;
		prevTextAreaId = $(obj).parent().find('textarea:last').attr('id');
		prevTextAreaId = prevTextAreaId.split('_');
		idToIncrement = prevTextAreaId[prevTextAreaId.length-1];
		idToIncrement = parseInt(idToIncrement);
		idToIncrement = idToIncrement + 1;
		return idToIncrement;
	};
	removePictureEditAttribute = function (event) {
		event.preventDefault();
		$(this).parent().remove();
	};
	constructPrompt = function (event) {
		event.preventDefault();
		closePrompt.init('msg', 'close', '<p><strong>Are you sure you wish to navigate away from this page with unpublished changes?</strong></p><p>You made changes that will be lost if you navigate away from this page without publishing them first</p><ul><li><a class="close" href="#close-prompt">No, stay on this page</a></li><li><a class="close-screen" href="#close">Yes, lose changes</a></li></ul>', 'body', 'bottom');
		window.scroll(0,0);
		
	};
	constructCloseBtn = function () {
		var getSaveStatus;
		that.closeBtn.css('display', 'block');
		getSaveStatus = that.dataRow.parents('#search-results');
		if (getSaveStatus.hasClass('is-saved')) {
			getSaveStatus.removeClass('is-saved');
		}
	};
	
	/*Public Functions*/
	this.init = function (dataRow, closeBtn) {
		this.dataRow = $(dataRow);
		this.addPictureEditBtn = this.dataRow.find('.add-picture-edit');
		this.closeBtn = $(closeBtn);
		domEvents();
	};
};  