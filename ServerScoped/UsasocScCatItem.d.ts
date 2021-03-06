/// <reference path="types/service-now/index.d.ts" />
/// <reference path="types/service-now/x_44813_usasoc_cst/index.d.ts" />
/// <reference types="service-now" />
interface IUsasocScCatItem extends ICustomClassBase<IUsasocScCatItem, "UsasocScCatItem"> {
    getRequest(): $$element.Reference<sc_requestFields, sc_requestGlideRecord>;
    getRequestedFor(): $$element.Reference<sys_userFields, sys_userGlideRecord>;
    isVip(): boolean;
}
interface IUsasocScCatItemPrototype extends ICustomClassPrototype1<IUsasocScCatItem, IUsasocScCatItemPrototype, "UsasocScCatItem", string>, IUsasocScCatItem {
    _sys_id: string;
    _req_item: sc_req_itemGlideRecord;
}
interface UsasocScCatItem extends Readonly<IUsasocScCatItem> {
}
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
declare const UsasocScCatItem: Readonly<UsasocScCatItemConstructor> & {
    new (sc_req_itemFields: any): UsasocScCatItem;
};
