var amfct_utils = this.amfct_utils || {};
amfct_utils.DataConstructor = function () {
	var that, ParseChangedRows, ParseInputElements, isArray, stringEndsWith;
	that = this;
	
	/*Private Functions*/
	isArray = function(o) {
		console.log('then');
		return Object.prototype.toString.call(o) === '[object Array]';
	};
	stringEndsWith = function (input, suffix) {
        	return input.indexOf(suffix, input.length - suffix.length) !== -1;
    	};
	ParseChangedRows = function (rows) {
        	var rowValues;
        	var storedInputs;
        	rowValues = [];
        	$(rows).find('input:checked').each(function () {
            		storedInputs = $(this).parents('tr').find(':input').not('input[type="checkbox"]');
            		rowValues[rowValues.length] = ParseInputElements(storedInputs);
        	});
        	return rowValues;
    	};
	ParseInputElements = function (inputElems) {
        	var values = {};
		$(inputElems).each(function (index) {
        		var name = $(this).attr('name');
            		if (stringEndsWith(name, '[]')) {
                		if (!isArray(values[name]))
                   			values[name] = [];
                		var arraySize = values[name].length;
                		values[name][arraySize] = $(this).val();
            		} else {
                		values[name] = $(this).val();
            		}
        	});
        	return values;
    	};    
	
	/*Public Functions*/
	this.ParseFieldInputs = function () {
		var jsonString, series, seasonInput, storedSeason;
        	series = [];
       	 	storedSeason = {};
        	seasonInput = $('.episode-details');
		seasonInput.each(function () {
            		var hasCheckedAlphas, alphaData, serie;
            		alphaData = [];
            		serie = {};
			hasCheckedAlphas = $(this).find('input:checked').val() ? true : false;
            		if (hasCheckedAlphas) {
				var aeNumber;
             			aeNumber = $(this).attr('id');
                		serie["SeasonNumber"] = $(this).parent().find('.series-details').find('input[type="text"]').val();
                		serie["TitleTk"] = $(this).parent().find('.series-details').find('input[type="hidden"]').val();
                		if (!storedSeason[aeNumber] && $(this).find('input:checked')) {
                    			storedSeason[aeNumber] = true;
                    			alphaData = ParseChangedRows(this);
                    			serie['AlphaChanges'] = alphaData;
                    			series[series.length] = serie;
                		}
           		 } else {
				serie["SeasonNumber"] = $(this).parent().find('.series-details').find('input[type="text"]').val();
				serie["TitleTk"] = $(this).parent().find('.series-details').find('input[type="hidden"]').val();
			}
			series[series.length] = serie;
        	});
        	jsonString = '{"SeriesChanges":' + JSON.stringify(series) + '}';
       		return jsonString;
    	};
};  