var ApiUtil = require('../util/apiUtil');
var FormValidator = require('../util/formValidator');

function readFileAndPreview(reader, ele, input) {
    reader.onload = function (e) {
        $(ele).attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
}

module.exports = {
    initAutoComplete: function (input, parentEle) {
        var _input = input || 'address';
        var _parentEle = parentEle || '.js_address_details';

        function fillAddress(place, element) {
            if (place) {
                element.find('.js_area,.js_locality,.js_city,.js_state,.js_country').val('');
                for (var i = 0; i < place.address_components.length; i++) {
                    switch (place.address_components[i].types[0]) {
                        case 'sublocality_level_1':
                            element.find('.js_area').val(place.address_components[i].long_name);
                            break;
                        case 'locality':
                            element.find('.js_locality').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_2':
                            element.find('.js_city').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_1':
                            element.find('.js_state').val(place.address_components[i].long_name);
                            break;
                        case 'country':
                            element.find('.js_country').val(place.address_components[i].long_name);
                            break;
                    }
                }
            }
        }

        if (document.getElementById(_input)) {
            var profile_address_autocomplete = new google.maps.places.Autocomplete((document.getElementById(_input)), {types: ['(regions)']});
            profile_address_autocomplete.addListener('place_changed', function () {
                var place = profile_address_autocomplete.getPlace();
                fillAddress(place, $(_parentEle));
            });
        }
    },
    checkImageDataString: function (dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        return matches && matches.length === 3;
    },
    imagePreview: function (input, ele, onlyImg) {
        var imgFileTypes = ['jpg', 'jpeg', 'png', 'gif'];

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var extension = input.files[0].name.split('.').pop().toLowerCase(),
                isSuccess = imgFileTypes.indexOf(extension) > -1;
            if (onlyImg) {
                if (isSuccess) {
                    readFileAndPreview(reader, ele, input);
                } else {
                    alert("Only jpg/jpeg and png files are allowed!");
                    return false;
                }
            } else {
                readFileAndPreview(reader, ele, input);
            }
        }
    },
    afterUserLogin: function (cb) {
        ApiUtil.makeAjaxRequest('/api/user/details', '', 'POST', '', '', function (data) {
            if (!data.err) {
                cb(data);
            } else {
                HeaderPage.setLoginCallBack(function (data) {
                    PopupPage.close();
                    cb(data);
                });
                $('.js_global_sign_in').trigger('click');
            }
        });
    },
    showFlashMsg: function (position, data) {
        var _msg_tmpl = Handlebars.partials['notification']({
            position: position,
            data: data,
        });
        $('body').append(_msg_tmpl);
        $('.js_tr_flash_msg_close').off('click').on('click', function () {
            var _ele = $(this).parent().parent();
            _ele.remove();
        });
    },
    initTrainerConnectBook: function () {
        var _self = this;
        $('.js_open_book_popup').off('click').on('click', function () {
            var _tname = $(this).data('tname');
            var _tid = $(this).data('tid');
            _self.afterUserLogin(function (data) {
                if (data && data.user && data.user.user_id) {
                    var tmpl = Handlebars.partials['book_trainer_popup']({
                        trainer_name: _tname,
                        user_id: data.user.user_id,
                        trainer_id: _tid,
                    });
                    PopupPage.init(tmpl, '', function () {
                        _self.initTrainerConnectBook();
                        _self.initAutoComplete();
                        var picker_two = new Pikaday({
                            field: document.getElementById('tdate'),
                            firstDay: 1,
                            minDate: new Date()
                        });
                        var picker = new Pikaday({
                            field: document.getElementById('fdate'),
                            firstDay: 1,
                            minDate: new Date(),
                            onSelect: function (date) {
                                picker_two.setMinDate(date);
                            }
                        });
                    });
                } else {
                    alert('Something went wrong try login again');
                }
            });
        });
        $('.js_open_connect_popup').off('click').on('click', function () {
            var _tname = $(this).data('tname');
            var _tid = $(this).data('tid');
            _self.afterUserLogin(function (data) {
                if (data && data.user && data.user.user_id) {
                    var tmpl = Handlebars.partials['connect_trainer_popup']({
                        trainer_name: _tname,
                        user_id: data.user.user_id,
                        trainer_id: _tid,
                    });
                    PopupPage.init(tmpl, '', function () {
                        _self.initTrainerConnectBook();
                        $('.timepicker').timepicker({
                            timeFormat: 'h:mm p',
                            interval: 30,
                            minTime: '8:00am',
                            maxTime: '8:00pm',
                            defaultTime: '10:00am',
                            startTime: '8:00am',
                            dynamic: false,
                            dropdown: true,
                            scrollbar: true
                        });
                        var picker_two = new Pikaday({
                            field: document.getElementById('tdate'),
                            firstDay: 1,
                            minDate: new Date()
                        });
                        var picker = new Pikaday({
                            field: document.getElementById('fdate'),
                            firstDay: 1,
                            minDate: new Date(),
                            onSelect: function (date) {
                                picker_two.setMinDate(date);
                            }
                        });
                    });
                } else {
                    alert('Something went wrong try login again');
                }
            });
        });


        //Booking request form submit
        var _booking_form_name = '#addNewBookingForm';
        $(_booking_form_name).submit(function (e) {
            e.preventDefault();

            if (FormValidator.validateForm(_booking_form_name)) {
                var _form = $(_booking_form_name);
                var _obj = {
                    message: _form.find('.js_msg').val(),
                    location: {
                        street: '',
                        area: _form.find('.js_locality').val(),
                        city: _form.find('.js_city').val(),
                        state: _form.find('.js_state').val(),
                        country: _form.find('.js_country').val()
                    },
                    user: _form.find('.js_uid').val(),
                    trainer: _form.find('.js_tid_id').val(),
                    from_date: _form.find('.js_fdate').val(),
                    to_date: _form.find('.js_tdate').val(),
                };
                ApiUtil.makeAjaxRequest('/api/post/booking-request', '', 'POST', '', _obj, function (_data) {
                    if (_data && !_data.err) {
                        $('.js_popup_form,.js_popup_footer').addClass('hide');
                        $('.js_form_success').removeClass('hide');
                    } else {
                        _form.find('.js_server_error_msg').removeClass('hide').html(_data.msg || 'Something went wrong');
                    }
                });
            }
        });

        //Trainer connect request form submit
        var _trainer_request_form_name = '#addNewConnectionForm';
        $(_trainer_request_form_name).submit(function (e) {
            e.preventDefault();

            if (FormValidator.validateForm(_trainer_request_form_name)) {
                var _form = $(_trainer_request_form_name);
                var _obj = {
                    message: _form.find('.js_msg').val(),
                    location: {
                        street: '',
                        area: _form.find('.js_locality').val(),
                        city: _form.find('.js_city').val(),
                        state: _form.find('.js_state').val(),
                        country: _form.find('.js_country').val()
                    },
                    user: _form.find('.js_uid').val(),
                    trainer: _form.find('.js_tid_id').val(),
                    pref_date: _form.find('.js_fdate').val(),
                    pref_time: _form.find('.js_pref_time').val(),
                    alt_date: _form.find('.js_tdate').val(),
                    alt_time: _form.find('.js_alt_time').val(),
                };
                ApiUtil.makeAjaxRequest('/api/post/connection-request', '', 'POST', '', _obj, function (_data) {
                    if (_data && !_data.err) {
                        $('.js_popup_form,.js_popup_footer').addClass('hide');
                        $('.js_form_success').removeClass('hide');
                    } else {
                        _form.find('.js_server_error_msg').removeClass('hide').html(_data.msg || 'Something went wrong');
                    }
                })
            }
        })
    }
};