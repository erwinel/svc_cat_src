/// <reference path="../types/index.d.ts" />

namespace Prevent_Past_Required_By {
    function onSubmit(): boolean {
        if (g_form.isNewRecord())
            return true;
        var s = g_form.getValue('needed_by');
        if (typeof s === 'undefined' || s === null || s === '')
            return true;
        function asDayStart(v: Date): Date {
            return new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0, 0);
        }
        if (asDayStart(new Date()) <= asDayStart(new Date(s)))
            return true;

        g_form.hideFieldMsg('needed_by', true);
        s = '"Required-By" cannot be in the past.';
        g_form.showFieldMsg('needed_by', s, 'error');
        alert(s);
        return false;
    }
}