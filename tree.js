var ts = require("typescript");

module.exports = {
 getFunctionLocations : function(node , locationsObj)  {
    for (var key of node.program.body) {
        
        if(key.type=="FunctionDeclaration"){
            locationsObj[key.id.name] = key.loc.start.line
        }
        
    }
},
getPublicFunctions : function(node, methodObj) {
    for (key of node.statements){
        if(ts.SyntaxKind[key.kind]=="FunctionDeclaration"){
            methodObj[key.name.escapedText] = key
        }
    }
 }

}