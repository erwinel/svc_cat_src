/// <reference path="types/index.d.ts" />
/// <reference types="service-now" />
declare type IUsasocHwReqItemInstallerType = "service_desk" | "requested_for";
declare interface IUsasocRequestItemVars {
    hw_installer_assignee_type: $$rhino.Nilable<$$property.generic.Question<IUsasocHwReqItemInstallerType>>;
    why_requested: $$rhino.Nilable<$$property.Question>;
    needed_by: $$rhino.Nilable<$$property.Question>;
    installation_deployment_location: $$rhino.Nilable<$$property.Question>;
    additional_information: $$rhino.Nilable<$$property.Question>;
}
interface IUsasocRequestItemFields extends Omit<sc_req_itemFields, "variables"> {
    variables: IUsasocRequestItemVars & IGlideElementVariables;
}
declare type IUsasocRequestItemGlideRecord = sc_req_itemGlideRecord & IUsasocRequestItemFields;
declare type IUsasocRequestItemElement = $$element.Reference<IUsasocRequestItemFields, IUsasocRequestItemGlideRecord>;
declare type IUsasocRequestItemProperty = $$property.generic.ReferenceProperty<IUsasocRequestItemFields, IUsasocRequestItemGlideRecord, IUsasocRequestItemElement>;
interface IUsasocHWRequestItemFields extends IUsasocRequestItemFields {
}
declare type IUsasocHWRequestItemGlideRecord = IUsasocRequestItemGlideRecord & IUsasocHWRequestItemFields;
declare type IUsasocHWRequestItemElement = $$element.Reference<IUsasocHWRequestItemFields, IUsasocHWRequestItemGlideRecord>;
declare type IUsasocHWRequestItemProperty = $$property.generic.ReferenceProperty<IUsasocHWRequestItemFields, IUsasocHWRequestItemGlideRecord, IUsasocHWRequestItemElement>;
declare interface UsasocHwRequestItemScratchPad {
    approval_deadline?: string;
    approval_group?: string;
}
declare type UsasocHwRequestItemWorkflow = Omit<Workflow, "scratchpad"> & {
    scratchpad: UsasocHwRequestItemScratchPad;
};
interface IUsasocScCatItem extends ICustomClassBase<IUsasocScCatItem, "UsasocScCatItem"> {
    getRequest(): sc_requestElement;
    getRequestedFor(): sys_userElement;
    isVip(): boolean;
}
interface IUsasocScCatItemPrototype extends ICustomClassPrototype1<IUsasocScCatItem, IUsasocScCatItemPrototype, "UsasocScCatItem", string>, IUsasocScCatItem {
    _sys_id: string;
    _req_item: sc_req_itemGlideRecord;
}
interface UsasocScCatItem extends Readonly<IUsasocScCatItem> {
}
interface UsasocScCatItemConstructor extends CustomClassConstructor1<IUsasocScCatItem, IUsasocScCatItemPrototype, UsasocScCatItem, string> {
    PROPERTYNAME_DEFAULT_SC_CAT_APPROVER_GROUP: "x_44813_svc_cat.default_sc_cat_approver_group";
    PROPERTYNAME_DEFAULT_SC_CAT_ASSIGNMENT_GROUP: "x_44813_svc_cat.default_sc_cat_assignment_group";
    STAGE_WAITING_FOR_APPROVAL: "waiting_for_approval";
    STAGE_REQUEST_APPROVED: "request_approved";
    STAGE_PROCUREMENT: "procurement";
    STAGE_BACKORDERED: "backordered";
    STAGE_FULFILLMENT: "fulfillment";
    STAGE_REQUEST_CANCELLED: "canceled";
    STAGE_COMPLETE: "complete";
    EVENT_NAME_REQ_ITEM_INSERTED: "sc_req_item.inserted";
    EVENT_NAME_REQ_ITEM_UPDATED: "sc_req_item.updated";
    EVENT_NAME_REQ_ITEM_DELIVERY: "sc_req_item.delivery";
    EVENT_NAME_REQ_ITEM_ASSIGNED: "sc_req_item.assigned";
    EVENT_NAME_REQ_ITEM_CHANGE_STAGE: "sc_req_item.change.stage";
    EVENT_NAME_REQ_ITEM_RECEIVED_CUSTOMER: "x_44813_svc_cat.sc_req_item.received.cust";
    EVENT_NAME_REQ_ITEM_RECEIVED_SD: "x_44813_svc_cat.sc_req_item.received.sd";
    EVENT_NAME_REQ_ITEM_APPROVED: "x_44813_svc_cat.sc_req_item.approved";
    EVENT_NAME_REQ_ITEM_BACKORDERED: "x_44813_svc_cat.sc_req_item.backordered";
    EVENT_NAME_REQ_ITEM_CANCELED: "x_44813_svc_cat.sc_req_item.canceled";
    EVENT_NAME_REQ_ITEM_REJECTED: "x_44813_svc_cat.sc_req_item.rejected";
    EVENT_NAME_REQ_ITEM_COMPLETED: "x_44813_svc_cat.sc_req_item.completed";
    isRequest(item: sc_req_itemElement | sc_requestElement | sc_req_itemGlideRecord | sc_requestGlideRecord): item is sc_req_itemElement | sc_requestElement;
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
