var amfct_utils = this.amfct_utils || {};
amfct_utils.ValidationSummary = function () {
	var that, domEvents, updateTable, constructSummary, updateRow, iterateDataRows, updateTextAreas, msgPrompt;
	that = this;
	
	/*Dependencies*/
	msgPrompt = new amfct_utils.MessagePrompt();
	
	/*Private Functions*/
	domEvents = function () {
		that.dataRow.delegate('textarea', 'focus', updateTextAreas);
	    that.dataRow.delegate('textarea', 'blur', updateTextAreas);
	    that.dataRow.delegate('input[type="checkbox"]', 'change', updateRow);
	};
	updateTable = function () {
		var msgContainer;
		window.scrollTo(0, 0);
		constructSummary();
		msgContainer = $('#msg-validation');
		msgContainer.find('table').html('');
		updateTextAreas();
		iterateDataRows($('#msg-validation'));
	};
	constructSummary = function () {
		var rowsSelected;
		rowsSelected = that.dataRow.find('input:checked').length;
		if(rowsSelected === 0) {
			msgPrompt.init('msg-validation','validation', '<h2>No Alphas selected</h2> <p>Please select the completed Alphas below</p>','#search-results', 'top');
		} else {
			msgPrompt.init('msg-validation', 'validation', '<h2>Sorry some Alphas are incomplete</h2>' + that.errorMsg +'', '#search-results', 'top');
			that.errorContainer = $('#msg-validation');
			that.errorContainer.append('<table id="alphas-uncompleted"><thead><tr><th scope="col">AE Number</th><th scope="col">AE Name</th><th scope="col">Episode No.</th></tr></thead><tbody></tbody></table>');
			iterateDataRows(that.errorContainer);
		}
	};
	updateTextAreas = function () {
		that.dataRow.find('input:checked').each(function () {
			$(this).parents('tr').find('textarea').each(function () {
				if($(this).val().length === 0 && $(this).parent().hasClass('mandatory')) {
					$(this).css('background-color', '#ff2200');
					$(this).css('color', '#fff');
				} else {
					$(this).css('background-color', '#fff');
					$(this).css('color', '#000');
				}
			});
		});
    };
    updateRow = function () {
        var row;
        row = $(this).parents('tr');
        if ($(this).attr('checked')) {
            row.find('textarea').each(function () {
                if ($(this).parent().hasClass('mandatory') && $(this).val().length === 0) {
                    $(this).css('background-color', '#ff2200');
                    $(this).css('color', '#fff');
                } else {
                    $(this).css('background-color', '#fff');
                    $(this).css('color', '#000');
                }
            });
        } else {
            row.find('textarea').each(function () {
                $(this).css('background-color', '#fff');
                $(this).css('color', '#000');
            });
        }
    };
	iterateDataRows = function (container) {
		that.dataRow.find('input:checked').each(function () {
			$(this).parents('tr').find('textarea').each(function () {
				if($(this).val().length === 0 && $(this).parent().hasClass('mandatory')) {
					container.find('#alphas-uncompleted').append('<tr><td>' +  $(this).parents('.series').find('.series-details .ae-number').html() + '</td><td> ' + $(this).parents('.series').find('.series-details .ae-name').html() +'</td><td>EPISODE:' + $(this).parents('tr').find('td:nth-child(5)').html() +'</td></tr>');
					return false;	
				} 
			});
		});
	};
	
	/*Public Functions*/
	this.init = function (dataRow, errorMsg, formChanged) {
		this.dataRow = dataRow;
		this.errorMsg = errorMsg;
		this.formChanged = formChanged;
		domEvents();

	};
	this.CheckAlphas = function () {
		that.dataRow.find('input:checked').each(function () {
            $(this).parents('tr').find('textarea').each(function () {
                if ($(this).val().length === 0 && $(this).parent().hasClass('mandatory')) {
                    that.formChanged = false;
                    return false;
                } else {
                    that.formChanged = true;
                }
            });
            if (that.formChanged === false) {
                return false;
            }
        });
        if (that.formChanged) {
            msgPrompt.TearDownMsg('#msg-validation');
            return true;
        } else {
            msgPrompt.TearDownMsg('#msg-validation');
            updateTable();
            return false;
        }
    };
};