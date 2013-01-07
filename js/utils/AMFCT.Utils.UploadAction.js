var amfct_utils = this.amfct_utils || {};
amfct_utils.UploadAction = function () {
    var domEvents, uploadAction, that;
    that = this;
    /*Private Functions*/
    domEvents = function () {
        that.submitBtn.bind('click', uploadAction);
    };

    getErrorMsg = function (msg) {
        msg = msg.split(':');
        msg = msg[1];
        msg = msg.split(']');
        msg = msg[0];
        return msg;
    }

    uploadAction = function (event) {
        var result, msgPrompt, fileToUpload, fileUploadEl, bar, percent, status;
        bar = $('.bar');
        percent = $('.percent');
        status = $('#status');
        msgPrompt = new amfct_utils.MessagePrompt();
        fileUploadEl = $('#importFile');
        fileToUpload = checkFileUpload(fileUploadEl);
        $.validity.start();
        $("#import_reference").require();
        result = $.validity.end();
        if (result.valid && fileToUpload) {
            that.form.ajaxSubmit({
                dataType: 'json',
                beforeSend: function () {
                    status.empty();
                    var percentVal = '0%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    var percentVal, result;
                    percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                complete: function (xhr) {
                    var msg;
                    if (xhr.status === 200 || xhr.responseText == "") {
                        msgPrompt.TearDownMsg('#msg');
                        msgPrompt.init('msg', 'publishing-successful', '<p>Alphas have successfully been uploaded</p>', 'body', 'top', true);
                    } else {
                        result = JSON.stringify(xhr.responseText);
                        result = getErrorMsg(result);
                        msgPrompt.init('msg', 'publishing-unsuccessful', '<p>A system error has occured, Alphas have not been uploaded</p><br />' + result + '<br /><a class="close" href="#close">Close</a>', 'body', 'bottom');
                    }
                }
            });
        }
        if (!fileToUpload) {
            fileUploadEl.parent().append('<span class="validity-tooltip">A file is required.</span>');
            fileUploadEl.parent().find('span').fadeIn('slow');
        }

        event.preventDefault();
    };

    var checkFileUpload = function (el) {
        if (el.val() === '') {
            return false
        } else {
            return true
        }
    };

    /*Public Functions*/
    this.init = function (form) {
        this.form = $(form);
        this.submitBtn = this.form.find("#import_reference_btn");
        domEvents();

    };
};
