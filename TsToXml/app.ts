import * as ts from 'typescript';
import * as fs from 'fs';
import * as xmlbuilder from 'xmlbuilder';

var tsSource: string = fs.readFileSync('../ServerScoped/types/service-now/Glide.d.ts', 'utf8');
var src: ts.SourceFile = ts.createSourceFile('', tsSource, ts.ScriptTarget.Latest);
var doc: xmlbuilder.XMLElement = xmlbuilder.create('types');

function isNil<T>(obj: T | null | undefined): obj is null | undefined { return typeof obj === 'undefined' || null === obj; }
function isNilOrEmpty(s: string | Array<any> | ReadonlyArray<any> | null | undefined): s is null | undefined {
    return (typeof s !== 'string' && (typeof s !== 'object' || null === s)) || s.length == 0;
}
function isNilOrWhitespace(s: string | null | undefined): s is null | undefined { return typeof s !== 'string' || s.trim().length == 0; }
function notNil<T>(obj: T | null | undefined): obj is T { return typeof obj !== 'undefined' && null !== obj; }
function notNilOrEmpty(s: string | Array<any> | ReadonlyArray<any> | null | undefined): s is string | Array<any> | ReadonlyArray<any> {
    return (typeof s === 'string' || (typeof s === 'object' && null !== s)) && s.length > 0;
}
function notNilOrWhitespace(s: string | null | undefined): s is string { return typeof s === 'string' && s.trim().length > 0; }

function importIdentifier(id: ts.Identifier, parent: xmlbuilder.XMLElement, attrName?: string): void {
    var identifier: string = id.text;
    parent.attribute((isNilOrWhitespace(attrName)) ? 'identifier' : attrName, (typeof identifier == 'string') ? identifier : '');
}

function importQualifiedName(name: ts.QualifiedName, parent: xmlbuilder.XMLElement, elementName?: string): void {
    var tdEl: xmlbuilder.XMLElement = parent.element((isNilOrWhitespace(elementName)) ? 'QualifiedName' : elementName);
    if (notNil(name.left)) {
        if (ts.isQualifiedName(name.left))
            importQualifiedName(name.left, tdEl, "Left");
        else
            importIdentifier(name.left, tdEl, "left");
    }
    if (notNil(name.right))
        importIdentifier(name.right, tdEl);
}

function importTypeReference(refNode: ts.TypeReferenceNode, parent: xmlbuilder.XMLElement, elementName?: string): void {
    var tdEl: xmlbuilder.XMLElement;
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
        refNode.typeArguments.forEach((node: ts.TypeNode) => {
            importTypeNode(node, tdEl, "TypeArgument");
        });
}

function importTypeNode(typeNode: ts.TypeNode, parent: xmlbuilder.XMLElement, elementName?: string): void {
    var tdEl: xmlbuilder.XMLElement = (isNilOrWhitespace(elementName)) ? parent : parent.element(elementName);
    if (ts.isTypeReferenceNode(typeNode))
        importTypeReference(typeNode, parent);
    else
        parent.element('unknownType').attribute('kind', '' + typeNode.kind);
}

function importTypeParameterDeclaration(targetNode: ts.TypeParameterDeclaration, parent: xmlbuilder.XMLElement, elementName?: string): void {
    var tdEl: xmlbuilder.XMLElement = (isNilOrWhitespace(elementName)) ? parent : parent.element(elementName);
    if (notNil(targetNode.name))
        importIdentifier(targetNode.name, tdEl, "name");




    targetNode.constraint;
    targetNode.default;
    targetNode.expression;
}

function importTypeAliasDeclaration(typeAliasDeclaration: ts.TypeAliasDeclaration, parent: xmlbuilder.XMLElement): void {
    var tdEl: xmlbuilder.XMLElement = parent.element('TypeAlias');
    var el: xmlbuilder.XMLElement;
    if (notNil(typeAliasDeclaration.name))
        importIdentifier(typeAliasDeclaration.name, tdEl, "name");
    if (notNilOrEmpty(typeAliasDeclaration.typeParameters))
        typeAliasDeclaration.typeParameters.forEach((node: ts.TypeParameterDeclaration) => {




        });

    typeAliasDeclaration.forEachChild((node: ts.Node) => {
        if (ts.isTypeNode(node)) {

        }
        switch (node.kind) {
            case ts.SyntaxKind.DeclareKeyword:
                tdEl.attribute('declare', 'true');
                break;
            case ts.SyntaxKind.Identifier:
                importIdentifier(<ts.Identifier>node, tdEl);
                break;
            case ts.SyntaxKind.TypeReference:
                importTypeReference(<ts.TypeReferenceNode>node, tdEl);
                break;
            case ts.SyntaxKind.UnionType:
                el = tdEl.element('Union');
                (<ts.UnionTypeNode>node).types.forEach((tn: ts.TypeNode) => {
                    el.element('unknown').attribute('kind', '' + tn.kind);
                });
                break;
            default:
                tdEl.element('unknown').attribute('kind', '' + node.kind);
                break;
        }
    });
}

src.statements.forEach((value: ts.Statement) => {
    switch (value.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration:




            break;
    }
    doc.element('unknown').attribute('kind', '' + value.kind);
});
var opt: xmlbuilder.XMLToStringOptions = {
    pretty: true,
    indent: "    ",
    width: 2048
};
fs.writeFileSync("./imported.xml", doc.end(opt));
