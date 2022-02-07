var UsasocServiceCatalog = (function () {
    var UsasocServiceCatalogConstructor = Class.create();
    UsasocServiceCatalogConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        getApprovalGroup: function () {
        },
        getFulfillmentGroup: function () {
        },
        type: "UsasocServiceCatalog"
    });
    return UsasocServiceCatalogConstructor;
})();
