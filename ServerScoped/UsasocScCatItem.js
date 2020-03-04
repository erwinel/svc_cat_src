/// <reference path="types/service-now/index.d.ts" />
/// <reference path="types/service-now/x_44813_usasoc_cst/index.d.ts" />
var UsasocScCatItem = (function () {
    var UsasocScCatItemConstructor = Class.create();
    UsasocScCatItemConstructor.STAGE_WAITING_FOR_APPROVAL = "waiting_for_approval";
    UsasocScCatItemConstructor.STAGE_REQUEST_APPROVED = "request_approved";
    UsasocScCatItemConstructor.STAGE_PROCUREMENT = "procurement";
    UsasocScCatItemConstructor.STAGE_BACKORDERED = "backordered";
    UsasocScCatItemConstructor.STAGE_FULFILLMENT = "fulfillment";
    UsasocScCatItemConstructor.STAGE_REQUEST_CANCELLED = "canceled";
    UsasocScCatItemConstructor.STAGE_COMPLETE = "complete";
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
//# sourceMappingURL=UsasocScCatItem.js.map