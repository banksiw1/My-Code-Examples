var amfct_utils = this.amfct_utils || {};
amfct_utils.TableFormatter = function () {
    var that, DomEvents, formatTable, updateTextAreaPosition, updateTextArea, getCurrentTextArea;
    that = this;

    /*Private Functions*/
    domEvents = function () {
        that.ShowHideContainer.delegate('a', 'click', formatTable);
		that.textArea.bind('keydown', updateTextArea);
		that.textArea.bind('focus', function () {
			var textareaParents;
			textareaParents = $(this).parents('table').find('textarea').removeClass('selected');
			$(this).addClass('selected');
		});
    };
    formatTable = function (event) {
        event.preventDefault();
        var episodeTable;
        episodeTable = that.container.find('.episode-details');
        if ($(this).attr('href') === "#hide") {
            episodeTable.removeClass('open');
            $(this).parents('ul').find('a[href="#show"]').addClass('in-active');
            $(this).parents('ul').find('a[href="#hide"]').removeClass('in-active');
            that.container.find('.episode-details').css('width', '1195px');
        } else {
            episodeTable.addClass('open');
            $(this).parents('ul').find('a[href="#show"]').removeClass('in-active');
            $(this).parents('ul').find('a[href="#hide"]').addClass('in-active');
            that.container.find('.episode-details').css('width', '2420px');
        }
    };
	getCurrentTextArea = function (el) {
		var selectedIndex;
		el.parents('tr').find('td').each(function (index) {
			if($(this).find('textarea').hasClass('selected')) {
				selectedIndex = index;
				return false;
			}
		});
		return selectedIndex;
	};
	updateTextAreaPosition = function (el, direction, index) {
		var row;
		if (direction === 40) {
			row = el.parents('tr').next('tr');
			row.find('td:eq('+ index + ') textarea').focus();
		} else if (direction === 38) {
			row = el.parents('tr').prev('tr');
			row.find('td:eq('+ index + ') textarea').focus();
		}
	};
	updateTextArea = function (event) {
		var dir, currentTextArea, currentIndex;
		dir = event.keyCode;
		currentIndex = getCurrentTextArea($(this));
		updateTextAreaPosition($(this), dir, currentIndex);
	};
	
	
    /*Public Functions*/
    this.init = function (container) {
        this.container = $(container);
        this.ShowHideContainer = this.container.find('#table-controls');
		this.textArea = this.container.find('textarea');
        domEvents();

    };

};