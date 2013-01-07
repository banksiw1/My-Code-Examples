var htmlSetup = {
	Setup:function() {
		$('body').append('<div class="series"></div>');
		var seriesContainer = $('body').find('.series');
		var seriesDetailsTable = seriesContainer.append('<table class="series-details"><thead><tr><th scope="col">AE No.</th><th scope="col">AE Name:</th><th scope="col">Season No.</th><th scope="col">No. of Episodes:</th><th scope="col">Series Configuration:</th></tr></thead><tbody><tr><td class="ae-number">ABLB552L</td><td class="ae-name">Top Gear: Series 20</td><td class="season-no"><label for="season_no">Season No.</label><input type="text" name="season_no" id="season_no" /></td><td>5</td><td>5x30</td></tr></tbody></table>');
		var seriesTable = seriesContainer.append('<table class="episode-details"><thead><tr><th scope="col">Select</th><th scope="col">Batch ID</th><th scope="col">BBC Core No.</th><th scope="col">Episode Title</th><th scope="col">Episode No.</th><th scope="col">SPS<br /> Version<br /> No.</th><th scope="col">SPS<br /> Version<br /> Description</th><th scope="col">Alpha Picture Edit</th><th scope="col">Alpha Made of<br /> Media</th><th class="small" scope="col">Alpha<br /> Owner</th><th scope="col">Alpha<br /> Delivered<br /> Version</th><th scope="col">Terroritory First TX</th><th scope="col">Original Language</th><th scope="col">Alpha Name</th><th scope="col">Alpha Type</th><th scope="col">OV Series<br /> AE No.<br /> DTX</th><th scope="col">OV Episode<br /> AE No.<br /> DTX</th><th scope="col">OV Series<br /> AE No.<br /> DVD</th><th scope="col">OV Episode<br /> AE No.<br /> DVD</th><th scope="col">OV Series<br /> AE No.<br /> BLU</th><th scope="col">OV Episode<br /> AE No.<br /> BLU</th><th scope="col">OV Series<br /> AE No.<br /> OCL</th><th scope="col">OV Episode<br /> AE No.<br /> OCL</th><th scope="col">VLX No.</th></tr></thead><tbody><tr><td class="small"><label for="select_record">Select Record</label><input id="select_record" type="checkbox" /></td><td class="small">48</td><td class="small">fkao481y</td><td class="small">EP. 01</td><td class="small">1</td><td class="small">1</td><td class="small">Base Product</td><td class="large mandatory"><label for="alpha_picture_edit">Alpha Picture Edit</label><textarea rows="3" name="alpha_picture_edit[]" id="alpha_picture_edit"></textarea></td><td class="medium mandatory"><label for="alpha_made_of_media">Alpha Made of Media</label><textarea rows="3" name="alpha_made_of_media" id="alpha_made_of_media"></textarea></td><td class="small-medium mandatory"><label for="alpha_owner">Alpha Owner</label><textarea rows="3" name="alpha_owner" id="alpha_owner"></textarea></td><td class="small-medium mandatory"><label for="alpha_delivered_version">Alpha Delivered Version</label><textarea rows="3" name="alpha_delivered_version" id="alpha_delivered_version"></textarea></td><td class="large mandatory"><label for="territory_first_tx">Territory First TX</label><textarea rows="3" name="territory_first_tx" id="territory_first_tx"></textarea></td><td class="medium readonly">Original Language</td><td class="large">Alpha Name</td><td class="small-medium mandatory"><label for="alpha_type">Alpha Type</label><textarea rows="3" name="alpha_type" id="alpha_type"></textarea></td><td class="small-medium optional"><label for="ov_series_ae_no_dtx">OV Series AE No. DTX</label><textarea rows="3" name="ov_series_ae_no_dtx" id="ov_series_ae_no_dtx"></textarea></td><td class="small-medium optional"><label for="ov_episode_ae_no_dtx">OV Episode AE No. DTX</label><textarea rows="3" name="ov_episode_ae_no_dtx" id="ov_episode_ae_no_dtx"></textarea></td><td class="small-medium optional"><label for="ov_series_ae_no_dvd">OV Series AE No. DVD</label><textarea rows="3" name="ov_series_ae_no_dvd" id="ov_series_ae_no_dvd"></textarea></td><td class="small-medium optional"><label for="ov_episode_ae_no_dvd">OV Episode AE No. DVD</label><textarea rows="3" name="ov_episode_ae_no_dvd" id="ov_episode_ae_no_dvd"></textarea></td><td class="small-medium optional"><label for="ov_series_ae_no_blu">OV Series AE No. BLU</label><textarea rows="3" name="ov_series_ae_no_blu" id="ov_series_ae_no_blu" ></textarea></td><td class="small-medium optional"><label for="ov_episode_ae_no_blu">OV Episode AE No. BLU</label><textarea rows="3" name="ov_episode_ae_no_blu" id="ov_episode_ae_no_blu"></textarea></td><td class="small-medium optional"><label for="ov_series_ae_no_ocl">OV Series AE No. OCL</label><textarea rows="3" name="ov_series_ae_no_ocl" id="ov_series_ae_no_ocl"></textarea></td><td class="small-medium optional"><label for="ov_episode_ae_no_ocl">OV Episode AE No. OCL</label><textarea rows="3" name="ov_episode_ae_no_ocl" id="ov_episode_ae_no_ocl"></textarea></td><td class="small">VLX 01154<input type="hidden" name="alpha_tk" id="alpha_tk_1" value="544"></td></tr></tbody></table>');
		var tableRow = seriesContainer.find('.episode-details').find('tbody tr');
		tableRow.find('input[type="checkbox"]').attr('checked', true);
	}
};

module("JSon Formatter", {
    setup: function() {
		htmlSetup.Setup();
		var amfEpisodeDetailsTable = $('body').find('.episode-details');
		amfEpisodeDetailsTable.find('tbody tr textarea').each(function(index){
			$(this).val("json Test");
		});
		var amfSeriesDetailsTable = $('body').find('.series-details').find('input[type="text"]').val("5");
	},
    teardown: function() {
        $('body').find('.series').remove();
    }
});
test("Check returned json String is properly formatted", function() {
	var amfEpisodeDetailsTable = new amfct.PublishAlphas();
	amfEpisodeDetailsTable.init(".series");
	amfEpisodeDetailsTable.ParseInputFields;
	equal(amfEpisodeDetailsTable.ParseFieldInputs(), '{"SeriesChanges":[{"SeasonNumber":"5","AlphaChanges":[{"alpha_picture_edit[]":["json Test"],"alpha_made_of_media":"json Test","alpha_owner":"json Test","alpha_delivered_version":"json Test","territory_first_tx":"json Test","alpha_type":"json Test","ov_series_ae_no_dtx":"json Test","ov_episode_ae_no_dtx":"json Test","ov_series_ae_no_dvd":"json Test","ov_episode_ae_no_dvd":"json Test","ov_series_ae_no_blu":"json Test","ov_episode_ae_no_blu":"json Test","ov_series_ae_no_ocl":"json Test","ov_episode_ae_no_ocl":"json Test","alpha_tk":"544"}]}]}');
	
});

module("Validate incomplete data submitted", {
    setup: function() {
    	htmlSetup.Setup();
		var amfEpisodeDetailsTable = $('.episode-details');
	    amfEpisodeDetailsTable.find('#AE_number').val("test input");
	},
    teardown: function() {
        $('body').find('.series').remove(); 
    }
});

test("Validate data submitted returns false as only one mandatory field has been filled in", function() {
	var validateAlphas =  new amfct_utils.ValidationSummary();
	var tableRow = $('.episode-details tbody tr');
	validateAlphas.init(tableRow);
	equal(validateAlphas.CheckAlphas(), false);
});

module("Validate data row submitted", {
    setup: function() {
    	htmlSetup.Setup();
		var amfEpisodeDetailsTable = $('.episode-details');
		var tableRow = amfEpisodeDetailsTable.find('tr');
	    tableRow.find('textarea').each(function(index){
			$(this).val("json Test");
	   	});
	},
    teardown: function() {
        $('body').find('.series').remove(); 
    }
});

test("Validate table row when all mandatory data is submitted should return true", function() {
	var validateAlphas =  new amfct_utils.ValidationSummary();
	var tableRow = $('.episode-details tbody tr');
	validateAlphas.init(tableRow);
	equal(validateAlphas.CheckAlphas(), true);
});










