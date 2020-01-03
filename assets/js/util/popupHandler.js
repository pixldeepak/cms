function PopupPage() {

    function closePopup() {
        $('body').removeClass('popup-visible modal-open');
        $('.cd-popup').removeClass('is-visible');
        $("#windowPopup").remove();

        //Remove time picker
        $('.ui-timepicker-standard').addClass('ui-helper-hidden ui-timepicker-hidden');
    }

    function bindClickEvents() {
        //open popup
        $('.cd-popup-trigger').off('click').on('click', function (event) {
            event.preventDefault();
            $('body').addClass('popup-visible modal-open');
            $('.cd-popup').addClass('is-visible');
        });

        //close popup
        $('.cd-popup').off('click').on('click', function (event) {
            if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup-close-icon') || $(event.target).is('.cd-popup')) {
                event.preventDefault();
                closePopup();
            }
        });

        //close popup when clicking the esc keyboard button
        $(document).keyup(function (event) {
            if (event.which == '27') {
                closePopup();
            }
        });
    }

    return {
        init: function (html, theme, cb) {
            $("#windowPopup").remove();
            var tmpl = Handlebars.partials['popup'];
            $('body').addClass('modal-open').append(tmpl({html: html, theme: theme}));
            bindClickEvents();
            if (cb) {
                cb();
            }
        },
        close: function () {
            closePopup();
        }
    }
}

module.exports = PopupPage();
