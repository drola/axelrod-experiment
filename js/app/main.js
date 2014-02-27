define(["jquery", "bootstrap", "bootstrap-select"], function($) {
    var initInputRangeRefreshing = function() {
        var update = function() {
            $(this).closest('.range-group').find('.range-value').text($(this).val());
        };

        $(".range-group input[type=range]").change(update).each(update);
    };

    $(function() {
        initInputRangeRefreshing();
    });
});
