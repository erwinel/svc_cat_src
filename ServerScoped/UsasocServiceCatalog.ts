interface IUsasocServiceCatalogExt extends ICustomClassBase<IUsasocServiceCatalog, "UsasocServiceCatalog"> {
}
interface IUsasocServiceCatalog extends IUsasocServiceCatalogExt, Omit<IAbstractAjaxProcessor, "type"> {
}
interface IUsasocServiceCatalogPrototype extends ICustomClassPrototype0<IUsasocServiceCatalog, IUsasocServiceCatalogPrototype, "UsasocServiceCatalog">, IUsasocServiceCatalog {
    getApprovalGroup(): void;
    getFulfillmentGroup(): void;
}
interface UsasocServiceCatalog extends Readonly<IUsasocServiceCatalog> { }
interface UsasocServiceCatalogConstructor extends CustomClassConstructor0<IUsasocServiceCatalog, IUsasocServiceCatalogPrototype, UsasocServiceCatalog>, AbstractAjaxProcessorConstructor {
    new(): UsasocServiceCatalog;
    (): UsasocServiceCatalog;
    getApprovalGroupId(item: sc_req_itemFields): string | undefined;
    getApprovalGroupId(user: sys_userFields, cat_item?: sc_cat_itemFields): string | undefined;
    getApprovalGroup(item: sc_req_itemFields): sys_user_groupGlideRecord | undefined;
    getApprovalGroup(user: sys_userFields, cat_item?: sc_cat_itemFields): sys_user_groupGlideRecord | undefined;
}

const UsasocServiceCatalog: Readonly<UsasocServiceCatalogConstructor> & { new(): UsasocServiceCatalog; } = (function (): UsasocServiceCatalogConstructor {
    var UsasocServiceCatalog: UsasocServiceCatalogConstructor = Class.create();
    UsasocServiceCatalog.getApprovalGroupId = function (item: sys_userFields | sc_req_itemFields, cat_item?: sc_cat_itemFields): string | undefined {

    };
    UsasocServiceCatalog.getApprovalGroup = function (item: sys_userFields | sc_req_itemFields, cat_item?: sc_cat_itemFields): sys_user_groupGlideRecord | undefined {

    };
    UsasocServiceCatalog.prototype = Object.extendsObject<IAbstractAjaxProcessor, IUsasocServiceCatalogExt, IUsasocServiceCatalogPrototype>(global.AbstractAjaxProcessor, <IUsasocServiceCatalogPrototype>{
        getApprovalGroup: function (this: IUsasocServiceCatalogPrototype): void {

        },
        getFulfillmentGroup: function (this: IUsasocServiceCatalogPrototype): void {

        },
        type: "UsasocServiceCatalog"
    });

    

    return UsasocServiceCatalog;
})();