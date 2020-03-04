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
    STAGE_WAITING_FOR_APPROVAL: "waiting_for_approval";
    STAGE_REQUEST_APPROVED: "request_approved";
    STAGE_PROCUREMENT: "procurement";
    STAGE_BACKORDERED: "backordered";
    STAGE_FULFILLMENT: "fulfillment";
    STAGE_REQUEST_CANCELLED: "canceled";
    STAGE_COMPLETE: "complete";
    isRequest(item: sc_req_itemFields | sc_requestFields): item is sc_requestFields;
}
declare const UsasocScCatItem: Readonly<UsasocScCatItemConstructor> & {
    new (sc_req_itemFields: any): UsasocScCatItem;
};
