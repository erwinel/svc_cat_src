/// <reference path="types/index.d.ts" />
var UsasocScCatItem = (function () {
    var UsasocScCatItemConstructor = Class.create();
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP = "x_44813_svc_cat.default_sc_cat_approver_group";
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP = "x_44813_svc_cat.default_sc_cat_assignment_group";
    UsasocScCatItemConstructor.STAGE_WAITING_FOR_APPROVAL = "waiting_for_approval";
    UsasocScCatItemConstructor.STAGE_REQUEST_APPROVED = "request_approved";
    UsasocScCatItemConstructor.STAGE_PROCUREMENT = "procurement";
    UsasocScCatItemConstructor.STAGE_BACKORDERED = "backordered";
    UsasocScCatItemConstructor.STAGE_FULFILLMENT = "fulfillment";
    UsasocScCatItemConstructor.STAGE_REQUEST_CANCELLED = "canceled";
    UsasocScCatItemConstructor.STAGE_COMPLETE = "complete";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_INSERTED = "sc_req_item.inserted";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_UPDATED = "sc_req_item.updated";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_DELIVERY = "sc_req_item.delivery";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_ASSIGNED = "sc_req_item.assigned";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_CHANGE_STAGE = "sc_req_item.change.stage";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_RECEIVED_CUSTOMER = "x_44813_svc_cat.sc_req_item.received.cust";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_RECEIVED_SD = "x_44813_svc_cat.sc_req_item.received.sd";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_APPROVED = "x_44813_svc_cat.sc_req_item.approved";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_BACKORDERED = "x_44813_svc_cat.sc_req_item.backordered";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_CANCELED = "x_44813_svc_cat.sc_req_item.canceled";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_REJECTED = "x_44813_svc_cat.sc_req_item.rejected";
    UsasocScCatItemConstructor.EVENT_NAME_REQ_ITEM_COMPLETED = "x_44813_svc_cat.sc_req_item.completed";
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
