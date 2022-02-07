/// <reference types="service-now" />
interface IUsasocServiceCatalogExt extends ICustomClassBase<IUsasocServiceCatalog, "UsasocServiceCatalog"> {
}
interface IUsasocServiceCatalog extends IUsasocServiceCatalogExt, Omit<IAbstractAjaxProcessor, "type"> {
}
interface IUsasocServiceCatalogPrototype extends ICustomClassPrototype0<IUsasocServiceCatalog, IUsasocServiceCatalogPrototype, "UsasocServiceCatalog">, IUsasocServiceCatalog {
    getApprovalGroup(): void;
    getFulfillmentGroup(): void;
}
interface UsasocServiceCatalog extends Readonly<IUsasocServiceCatalog> {
}
interface UsasocServiceCatalogConstructor extends CustomClassConstructor0<IUsasocServiceCatalog, IUsasocServiceCatalogPrototype, UsasocServiceCatalog>, AbstractAjaxProcessorConstructor {
    new (): UsasocServiceCatalog;
    (): UsasocServiceCatalog;
}
declare const UsasocServiceCatalog: Readonly<UsasocServiceCatalogConstructor> & {
    new (): UsasocServiceCatalog;
};
