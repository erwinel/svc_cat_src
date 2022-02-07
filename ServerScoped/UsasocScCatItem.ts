/// <reference path="types/index.d.ts" />

declare type IUsasocHwReqItemInstallerType = "service_desk" | "requested_for";
declare interface IUsasocRequestItemVars {
    // Who will be responsible for configuration and deployment?
    // default: service_desk
    hw_installer_assignee_type: $$rhino.Nilable<$$property.generic.Question<IUsasocHwReqItemInstallerType>>;
    // Why is this request being submitted?
    why_requested: $$rhino.Nilable<$$property.Question>;
    // When is this item required?
    needed_by: $$rhino.Nilable<$$property.Question>;
    // Installation / deployment location
    installation_deployment_location: $$rhino.Nilable<$$property.Question>;
    // Additional Information
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
}

interface IUsasocScCatItem extends ICustomClassBase<IUsasocScCatItem, "UsasocScCatItem"> {
    getRequest(): sc_requestElement;
    getRequestedFor(): sys_userElement;
    isVip(): boolean;
}
interface IUsasocScCatItemPrototype extends ICustomClassPrototype1<IUsasocScCatItem, IUsasocScCatItemPrototype, "UsasocScCatItem", string>, IUsasocScCatItem {
    _sys_id: string;
    _req_item: sc_req_itemGlideRecord;
}
interface UsasocScCatItem extends Readonly<IUsasocScCatItem> { }
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
    // Request item enters fulfullment (deployment) stage for self-installation/deployment by customer
    EVENT_NAME_REQ_ITEM_RECEIVED_CUSTOMER: "x_44813_svc_cat.sc_req_item.received.cust";
    // Request item enters fulfullment (deployment) stage for installation/deployment by Service Desk
    EVENT_NAME_REQ_ITEM_RECEIVED_SD: "x_44813_svc_cat.sc_req_item.received.sd";
    // A request item has been approved.
    EVENT_NAME_REQ_ITEM_APPROVED: "x_44813_svc_cat.sc_req_item.approved";
    // A request item has been backordered
    EVENT_NAME_REQ_ITEM_BACKORDERED: "x_44813_svc_cat.sc_req_item.backordered";
    // A request item stage has changed to Cancelled
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
const UsasocScCatItem: Readonly<UsasocScCatItemConstructor> & { new(sc_req_itemFields): UsasocScCatItem; } = (function (): UsasocScCatItemConstructor {
    var UsasocScCatItemConstructor: UsasocScCatItemConstructor = Class.create();
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
    UsasocScCatItemConstructor.isRequest = function (item: sc_req_itemElement | sc_requestElement | sc_req_itemGlideRecord | sc_requestGlideRecord): item is sc_req_itemElement | sc_requestElement {
        return typeof item === 'object' && null != item && item.getTableName() == 'sc_request';
    }
    UsasocScCatItemConstructor.prototype = <IUsasocScCatItemPrototype><Omit<IUsasocScCatItemPrototype, "_sys_id" | "_req_item" | "_request">>{
        initialize: function (this: IUsasocScCatItemPrototype, sys_id: string): void {
            this._req_item = <sc_req_itemGlideRecord>new GlideRecord('sc_req_item');
            this._req_item.addQuery('sys_id', sys_id);
            this._req_item.query();
            if (!this._req_item.hasNext())
                throw new Error("Record not found");
        },
        getRequest: function (this: IUsasocScCatItemPrototype): sc_requestElement {
            return <sc_requestElement>this._req_item.request;

        },
        getRequestedFor: function (this: IUsasocScCatItemPrototype): sys_userElement {

            return <sys_userElement>this.getRequest().requested_for;
        },
        type: "UsasocScCatItem"
    }

    return UsasocScCatItemConstructor;
})();