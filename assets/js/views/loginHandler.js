var ApiUtil = require('../util/apiUtil');
var FormValidator = require('../util/formValidator');
var Helpers = require('../util/common');

function LoginPage() {

    function submitLoginForm() {
        if (FormValidator.validateForm('#jsLoginForm')) {
            var obj = {
                username: $('.js_username').val(),
                password: $('.js_password').val()
            };
            var callback = function (data) {
                if (data && !data.err) {
                    if(Helpers.getParameter('ref')){
                        window.location.href = Helpers.getParameter('ref');
                    }else{
                        window.location.href = '/';
                    }
                } else {
                    alert(data.msg || 'something went wrong');
                }
            };
            ApiUtil.makeAjaxRequest('/api/login', '', 'POST', '', obj, callback);
        }
    }

    function submitRegister() {
        if (FormValidator.validateForm('#jsRegisterForm')) {
            var obj = {
                first_name: $('.js_name').val(),
                email: $('.js_email').val(),
                password: $('.js_password').val()
            };
            var callback = function (data) {
                if (data && !data.err) {
                    alert(data.msg);
                    // window.location.href = '/login';
                } else {

                    alert(data.msg || 'something went wrong');
                }
            };
            ApiUtil.makeAjaxRequest('/api/register', '', 'POST', '', obj, callback);
        }
    }

    function submitForgotPassword() {
        if (FormValidator.validateForm('#jsForgotPassword')) {
            var obj = {
                email: $('.js_email').val(),
            };
            var callback = function (data) {
                if (data && !data.err) {
                    alert(data.msg);
                } else {

                    alert(data.msg || 'something went wrong');
                }
                console.log(data);
            };
            ApiUtil.makeAjaxRequest('/api/forgot-password', '', 'POST', '', obj, callback);
        }
    }

    function submitUpdatePassword() {
        if (FormValidator.validateForm('#jsUpdatePassword')) {
            var newpassword = $('.js_newpassword').val();
            var confirmpassword = $('.js_confirmpassword').val();
            var status = false;
            var obj = {
                token: $('.js_token').val(),
            };
            if (newpassword === confirmpassword) {
                status = true;
                obj.password = newpassword;
            }


            var callback = function (data) {
                if (data && !data.err) {
                    alert(data.msg);
                    window.location.href = '/login';
                } else {
                    alert(data.msg || 'something went wrong');
                }
                console.log(obj);
                console.log(data);
            };

            console.log(status);

            if (status) {
                ApiUtil.makeAjaxRequest('/api/update-password', '', 'POST', '', obj, callback);
            }
            else {
                alert("incorrect password");
            }

        }
    }

    return {
        initLogin: function () {
            $('.js_username').on('keypress', function (e) {
                var code = event.keyCode ? event.keyCode : event.which;
                if (code === 13) {
                    submitLoginForm(e);
                }
            });
            $('#jsLoginForm').submit(function (e) {
                submitLoginForm(e);
                return false;
            });
        },
        initRegister: function () {
            $('#jsRegisterForm').submit(function (e) {
                submitRegister(e);
                return false;
            });
        },

        initForgotPassword: function () {
            $('#jsForgotPassword').submit(function (e) {
                submitForgotPassword(e);
                return false;
            });
        },

        initUpdatePassword: function () {
            $('#jsUpdatePassword').submit(function (e) {
                e.preventDefault();
                submitUpdatePassword(e);
                return false;
            });
        },

    }
}

module.exports = LoginPage();
