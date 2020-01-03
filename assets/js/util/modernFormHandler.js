function ModernForm() {

    return {
        init: function () {
            var modernInputElement = $('.js_modern_input');
            var modernCheckBoxElement = $('.js_modern_checkbox');
            var modernRadioElement = $('.js_modern_radio');

            modernInputElement.off('click').on('click', function () {
                $(this).parent().find('label').addClass('focus');
            });

            modernInputElement.off('blur').on('blur', function () {
                if ($(this).val() === '') {
                    $(this).parent().find('label').removeClass('focus');
                }
            });

            modernCheckBoxElement.off('click').on('click', function () {
                var _checkbox = $(this).find('input[type=checkbox]');
                $(this).toggleClass('active');
                _checkbox.prop('checked', function () {
                    return !this.checked;
                });
                _checkbox.trigger('change');
            });

            modernRadioElement.off('click').on('click', function () {
                var _input = $(this).find('input[type=radio]');
                var _input_group = $(this).find('input[type=radio]').attr('name');
                var _input_group_input = $('input[name="' + _input_group + '"]');
                _input_group_input.parent().removeClass('active');
                $(this).addClass('active');
                _input_group_input.prop('checked', false);
                _input.prop('checked', true);
            });
        }
    }
}

module.exports = ModernForm();
