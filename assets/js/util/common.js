module.exports = {
    checkParams: function (_url) {

    },
    getParameter: function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    },
    initProfileImageCropper: function (formId, _previewEle, imageId, cb) {
        var image = document.getElementById(imageId);
        var cropBoxData;
        var canvasData;
        var cropper;
        var inputElement = $(formId).find('.js_file_input');
        var submitElement = $(formId).find('.js_submit_img');
        var closeBtnElement = $(formId).find('.js_img_popup_close');
        var _image_holder_ele = $(_previewEle);

        function readURL(input, preview_ele) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(preview_ele).attr('src', e.target.result);
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper(image, {
                        autoCropArea: 0.5,
                        aspectRatio: 1 / 1,
                        ready: function () {
                            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                        }
                    });
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        inputElement.change(function () {
            if (this.files[0].size < 3145728) {
                readURL(this, $(this).data('preview'));
            } else {
                alert('file must be select less than 3 MB');
                $(this).val('');
            }
        });

        submitElement.off('click').on('click', function () {
            closeBtnElement.trigger('click');
            _image_holder_ele.attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
            if (cb) {
                cb();
            }
        })
    },
    initCoverImageCropper: function (formId, _previewEle, imageId, cb) {
        var image = document.getElementById(imageId);
        var cropBoxData;
        var canvasData;
        var cropper;
        var inputElement = $(formId).find('.js_file_input');
        var submitElement = $(formId).find('.js_submit_img');
        var closeBtnElement = $(formId).find('.js_img_popup_close');
        var _image_holder_ele = $(_previewEle);

        function readURL(input, preview_ele) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(preview_ele).attr('src', e.target.result);
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper(image, {
                        autoCropArea: 0.5,
                        aspectRatio: 1 / 1,
                        ready: function () {
                            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                        }
                    });
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        inputElement.change(function () {
            if (this.files[0].size < 3145728) {
                readURL(this, $(this).data('preview'));
            } else {
                alert('file must be select less than 3 MB');
                $(this).val('');
            }
        });

        submitElement.off('click').on('click', function () {
            closeBtnElement.trigger('click');
            // _image_holder_ele.attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
            _image_holder_ele.css({"background-image": "url('" + cropper.getCroppedCanvas().toDataURL('image/png') + "')"});
            if (cb) {
                cb();
            }
        })
    }
};

