"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
var tsSource = fs.readFileSync('../ServerScoped/types/service-now/Glide.d.ts', 'utf8');
var src = ts.createSourceFile('', tsSource, ts.ScriptTarget.Latest);
var doc = xmlbuilder.create('types');
function isNil(obj) { return typeof obj === 'undefined' || null === obj; }
function isNilOrEmpty(s) {
    return (typeof s !== 'string' && (typeof s !== 'object' || null === s)) || s.length == 0;
}
function isNilOrWhitespace(s) { return typeof s !== 'string' || s.trim().length == 0; }
function notNil(obj) { return typeof obj !== 'undefined' && null !== obj; }
function notNilOrEmpty(s) {
    return (typeof s === 'string' || (typeof s === 'object' && null !== s)) && s.length > 0;
}
function notNilOrWhitespace(s) { return typeof s === 'string' && s.trim().length > 0; }
function importIdentifier(id, parent, attrName) {
    var identifier = id.text;
    parent.attribute((isNilOrWhitespace(attrName)) ? 'identifier' : attrName, (typeof identifier == 'string') ? identifier : '');
}
function importQualifiedName(name, parent, elementName) {
    var tdEl = parent.element((isNilOrWhitespace(elementName)) ? 'QualifiedName' : elementName);
    if (notNil(name.left)) {
        if (ts.isQualifiedName(name.left))
            importQualifiedName(name.left, tdEl, "Left");
        else
            importIdentifier(name.left, tdEl, "left");
    }
    if (notNil(name.right))
        importIdentifier(name.right, tdEl);
}
function importTypeReference(refNode, parent, elementName) {
    var tdEl;
    if (isNilOrWhitespace(elementName))
        (tdEl = parent).attribute("kind", "TypeReference");
    else
        tdEl = parent.element(elementName);
    if (notNil(refNode.typeName)) {
        if (ts.isQualifiedName(refNode.typeName))
            importQualifiedName(refNode.typeName, tdEl, "TypeName");
        else
            importIdentifier(refNode.typeName, tdEl, "typeName");
    }
    if (notNilOrEmpty(refNode.typeArguments))
        refNode.typeArguments.forEach((node) => {
            importTypeNode(node, tdEl, "TypeArgument");
        });
}
function importTypeNode(typeNode, parent, elementName) {
    var tdEl = (isNilOrWhitespace(elementName)) ? parent : parent.element(elementName);
    if (ts.isTypeReferenceNode(typeNode))
        importTypeReference(typeNode, parent);
    else
        parent.element('unknownType').attribute('kind', '' + typeNode.kind);
}
function importTypeParameterDeclaration(targetNode, parent, elementName) {
    var tdEl = (isNilOrWhitespace(elementName)) ? parent : parent.element(elementName);
    if (notNil(targetNode.name))
        importIdentifier(targetNode.name, tdEl, "name");
    targetNode.constraint;
    targetNode.default;
    targetNode.expression;
}
function importTypeAliasDeclaration(typeAliasDeclaration, parent) {
    var tdEl = parent.element('TypeAlias');
    var el;
    if (notNil(typeAliasDeclaration.name))
        importIdentifier(typeAliasDeclaration.name, tdEl, "name");
    if (notNilOrEmpty(typeAliasDeclaration.typeParameters))
        typeAliasDeclaration.typeParameters.forEach((node) => {
        });
    typeAliasDeclaration.forEachChild((node) => {
        if (ts.isTypeNode(node)) {
        }
        switch (node.kind) {
            case ts.SyntaxKind.DeclareKeyword:
                tdEl.attribute('declare', 'true');
                break;
            case ts.SyntaxKind.Identifier:
                importIdentifier(node, tdEl);
                break;
            case ts.SyntaxKind.TypeReference:
                importTypeReference(node, tdEl);
                break;
            case ts.SyntaxKind.UnionType:
                el = tdEl.element('Union');
                node.types.forEach((tn) => {
                    el.element('unknown').attribute('kind', '' + tn.kind);
                });
                break;
            default:
                tdEl.element('unknown').attribute('kind', '' + node.kind);
                break;
        }
    });
}
src.statements.forEach((value) => {
    switch (value.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration:
            break;
    }
    doc.element('unknown').attribute('kind', '' + value.kind);
});
var opt = {
    pretty: true,
    indent: "    ",
    width: 2048
};
fs.writeFileSync("./imported.xml", doc.end(opt));
//# sourceMappingURL=app.js.map