/// <reference path="types/service-now/index.d.ts" />
/// <reference path="types/service-now/x_44813_usasoc_cst/index.d.ts" />
var UsasocScCatItem = (function () {
    var UsasocScCatItemConstructor = Class.create();
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP = "x_44813_usasoc_cst.default_sc_cat_approver_group";
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP = "x_44813_svc_cat.default_sc_cat_assignment_group";
    UsasocScCatItemConstructor.STAGE_WAITING_FOR_APPROVAL = "waiting_for_approval";
    UsasocScCatItemConstructor.STAGE_REQUEST_APPROVED = "request_approved";
    UsasocScCatItemConstructor.STAGE_PROCUREMENT = "procurement";
    UsasocScCatItemConstructor.STAGE_BACKORDERED = "backordered";
    UsasocScCatItemConstructor.STAGE_FULFILLMENT = "fulfillment";
    UsasocScCatItemConstructor.STAGE_REQUEST_CANCELLED = "canceled";
    UsasocScCatItemConstructor.STAGE_COMPLETE = "complete";
    UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId = function () {
        var result = '' + gs.getProperty(UsasocScCatItem.PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP, '');
        if (result.length > 0)
            return result;
    };
    UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroup = function () {
        var sys_id = UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId();
        if (typeof sys_id === 'string') {
            var gr = new GlideRecord("sys_user_group");
            gr.addQuery(sys_id);
            gr.query();
            if (gr.next())
                return gr;
        }
    };
    UsasocScCatItemConstructor.getDefaultScCatItemAssignmentGroupSysId = function () {
        var result = '' + gs.getProperty(UsasocScCatItem.PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP, '');
        if (result.length > 0)
            return result;
    };
    UsasocScCatItemConstructor.getDefaultScCatItemAssignmentGroup = function () {
        var sys_id = UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId();
        if (typeof sys_id === 'string') {
            var gr = new GlideRecord("sys_user_group");
            gr.addQuery(sys_id);
            gr.query();
            if (gr.next())
                return gr;
        }
    };
    UsasocScCatItemConstructor.isRequest = function (item) {
        return typeof item === 'object' && null != item && item.getTableName() == 'sc_request';
    };
    UsasocScCatItemConstructor.prototype = {
        initialize: function (sys_id) {
            this._req_item = new GlideRecord('sc_req_item');
            this._req_item.addQuery('sys_id', sys_id);
            this._req_item.query();
            if (!this._req_item.hasNext())
                throw new Error("Record not found");
        },
        getRequest: function () {
            return this._req_item.request;
        },
        getRequestedFor: function () {
            return this.getRequest().requested_for;
        },
        type: "UsasocScCatItem"
    };
    return UsasocScCatItemConstructor;
})();
