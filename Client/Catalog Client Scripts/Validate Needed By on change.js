/// <reference path="../types/index.d.ts" />
var Validate_Needed_By_on_change;
(function (Validate_Needed_By_on_change) {
    function onChange(control, oldValue, newValue, isLoading) {
        g_form.hideFieldMsg('needed_by', true);
        if (isLoading || typeof newValue === 'undefined' || newValue === null || newValue === '')
            return;
        function asDayStart(v) {
            return new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0, 0);
        }
        var d = asDayStart(new Date(newValue));
        var n = asDayStart(new Date());
        if (d < n)
            g_form.showFieldMsg('needed_by', '"Required-By" cannot be in the past.', 'error');
        else {
            n.setMonth(n.getMonth() + 1);
            n.setDate(n.getDate() + 7);
            if (d < n)
                g_form.showFieldMsg('needed_by', 'Note: IF this item is not in stock locally, this requirement may not be met in time.', 'info');
        }
    }
})(Validate_Needed_By_on_change || (Validate_Needed_By_on_change = {}));
