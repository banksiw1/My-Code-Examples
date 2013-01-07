var amfct_utils = this.amfct_utils || {};
amfct_utils.MessagePrompt = function () {
	var that, constructPrompt, domEvents;
	that = this;
	
	/*Private Functions*/
	domEvents = function () {
		$('#msg').find('a.close').click(function (event) {
			event.preventDefault();
			that.TearDownMsg('#' + that.messageId);
		});
	};
	constructPrompt = function () {
		var htmlToInject, msgContainer;
		msgContainer = '#' + that.messageId;
		htmlToInject = '<div id=' + that.messageId + ' class=' + that.messageClass + '>' + that.msg + '</div>';
		if(that.position === "top") {
			that.container.prepend(htmlToInject);
		} else {
			that.container.append(htmlToInject);
		}
		if(that.fadeMsg === true) {
			$(msgContainer).delay(4000).fadeOut('slow', function () {
				that.TearDownMsg('#msg');
				
			
			});
		}
		
	};
	
	/*Public Functions*/
	this.init = function (messageId, messageClass, msg, container, position, fadeMsg) {
		this.messageId = messageId;
		this.messageClass = messageClass;
		this.msg = msg;
		this.container = $(container);
		this.position = position;
		this.fadeMsg = fadeMsg;
		constructPrompt();
		domEvents();
	};
	this.TearDownMsg = function (id) {
		$(id).remove();
	};
};  