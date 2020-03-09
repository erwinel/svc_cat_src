/// <reference path="types/service-now/index.d.ts" />
/// <reference path="types/service-now/x_44813_usasoc_cst/index.d.ts" />

interface IUsasocScCatItem extends ICustomClassBase<IUsasocScCatItem, "UsasocScCatItem"> {
    getRequest(): $$element.Reference<sc_requestFields, sc_requestGlideRecord>;
    getRequestedFor(): $$element.Reference<sys_userFields, sys_userGlideRecord>;
    isVip(): boolean;
}
interface IUsasocScCatItemPrototype extends ICustomClassPrototype1<IUsasocScCatItem, IUsasocScCatItemPrototype, "UsasocScCatItem", string>, IUsasocScCatItem {
    _sys_id: string;
    _req_item: sc_req_itemGlideRecord;
}
interface UsasocScCatItem extends Readonly<IUsasocScCatItem> { }
interface UsasocScCatItemConstructor extends CustomClassConstructor1<IUsasocScCatItem, IUsasocScCatItemPrototype, UsasocScCatItem, string> {
    PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP: "x_44813_usasoc_cst.default_sc_cat_approver_group";
    PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP: "x_44813_svc_cat.default_sc_cat_assignment_group";
    STAGE_WAITING_FOR_APPROVAL: "waiting_for_approval";
    STAGE_REQUEST_APPROVED: "request_approved";
    STAGE_PROCUREMENT: "procurement";
    STAGE_BACKORDERED: "backordered";
    STAGE_FULFILLMENT: "fulfillment";
    STAGE_REQUEST_CANCELLED: "canceled";
    STAGE_COMPLETE: "complete";
    isRequest(item: sc_req_itemFields | sc_requestFields): item is sc_requestFields;
    /**
     * Gets the Sys ID of the default Approval Group for service catalog request items. This is for instances where the location-based approval group could not be determined.
     * d625dccec0a8016700a222a0f7900d06
     */
    getDefaultScCatItemApprovalGroupSysId(): string | undefined;
    getDefaultScCatItemApprovalGroup(): sys_user_groupGlideRecord | undefined;
    /**
     * Gets the Sys ID of the default Assignment Group for service catalog request items. This is for instances where the catalog item assignment group is empty.
     * d625dccec0a8016700a222a0f7900d06
     */
    getDefaultScCatItemAssignmentGroupSysId(): string | undefined;
    getDefaultScCatItemAssignmentGroup(): sys_user_groupGlideRecord | undefined;
}
const UsasocScCatItem: Readonly<UsasocScCatItemConstructor> & { new(sc_req_itemFields): UsasocScCatItem; } = (function (): UsasocScCatItemConstructor {
    var UsasocScCatItemConstructor: UsasocScCatItemConstructor = Class.create();
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP = "x_44813_usasoc_cst.default_sc_cat_approver_group";
    UsasocScCatItemConstructor.PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP = "x_44813_svc_cat.default_sc_cat_assignment_group";
    UsasocScCatItemConstructor.STAGE_WAITING_FOR_APPROVAL = "waiting_for_approval";
    UsasocScCatItemConstructor.STAGE_REQUEST_APPROVED = "request_approved";
    UsasocScCatItemConstructor.STAGE_PROCUREMENT = "procurement";
    UsasocScCatItemConstructor.STAGE_BACKORDERED = "backordered";
    UsasocScCatItemConstructor.STAGE_FULFILLMENT = "fulfillment";
    UsasocScCatItemConstructor.STAGE_REQUEST_CANCELLED = "canceled";
    UsasocScCatItemConstructor.STAGE_COMPLETE = "complete";
    UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId = function (): string {
        var result: string = '' + gs.getProperty(UsasocScCatItem.PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP, '');
        if (result.length > 0)
            return result;
    };
    UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroup = function (): sys_user_groupGlideRecord {
        var sys_id: string | undefined = UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId();
        if (typeof sys_id === 'string') {
            var gr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord("sys_user_group");
            gr.addQuery(sys_id);
            gr.query();
            if (gr.next())
                return gr;
        }
    };
    UsasocScCatItemConstructor.getDefaultScCatItemAssignmentGroupSysId = function (): string {
        var result: string = '' + gs.getProperty(UsasocScCatItem.PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP, '');
        if (result.length > 0)
            return result;
    };
    UsasocScCatItemConstructor.getDefaultScCatItemAssignmentGroup = function (): sys_user_groupGlideRecord {
        var sys_id: string | undefined = UsasocScCatItemConstructor.getDefaultScCatItemApprovalGroupSysId();
        if (typeof sys_id === 'string') {
            var gr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord("sys_user_group");
            gr.addQuery(sys_id);
            gr.query();
            if (gr.next())
                return gr;
        }
    };
    UsasocScCatItemConstructor.isRequest = function (item: sc_req_itemFields | sc_requestFields): item is sc_requestFields {
        return typeof item === 'object' && null != item && (<$$element.Reference<sc_requestFields, sc_requestGlideRecord>>item).getTableName() == 'sc_request';
    }
    UsasocScCatItemConstructor.prototype = <IUsasocScCatItemPrototype><Omit<IUsasocScCatItemPrototype, "_sys_id" | "_req_item" | "_request">>{
        initialize: function (this: IUsasocScCatItemPrototype, sys_id: string): void {
            this._req_item = <sc_req_itemGlideRecord>new GlideRecord('sc_req_item');
            this._req_item.addQuery('sys_id', sys_id);
            this._req_item.query();
            if (!this._req_item.hasNext())
                throw new Error("Record not found");
        },
        getRequest: function (this: IUsasocScCatItemPrototype): $$element.Reference<sc_requestFields, sc_requestGlideRecord> {
            return <$$element.Reference<sc_requestFields, sc_requestGlideRecord>>this._req_item.request;

        },
        getRequestedFor: function (this: IUsasocScCatItemPrototype): $$element.Reference<sys_userFields, sys_userGlideRecord> {

            return <$$element.Reference<sys_userFields, sys_userGlideRecord>>(<sc_requestFields>this.getRequest()).requested_for;
        },
        type: "UsasocScCatItem"
    }

    return UsasocScCatItemConstructor;
})();