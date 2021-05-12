const fs = require("fs");
const ts = require("typescript");
const acorn = require('acorn');
const babel = require("@babel/core");
const tree = require('./tree');
const nodeProcessor = require("./nodeProcessor");
const parameterProcessor = require("./parameterProcessor");
var readlineSync = require('readline-sync');







var sourceString = readlineSync.question('Enter older version location : ');
var targetString = readlineSync.question('Enter new version location : ');
var destination =  readlineSync.question('Log file destination : ' );
var logger = fs.createWriteStream(destination, {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })



var posfilename1 =  fs.readFileSync(sourceString).toString();
var posfilename2 =  fs.readFileSync(targetString).toString();


/* Use acorn to generate the AST of hello.js */
var babel_source_ast = babel.parse(posfilename1);
var babel_target_ast = babel.parse(posfilename2);




let filename1 = fs.readFileSync(sourceString, "utf8");
let filename2 = fs.readFileSync(targetString, "utf8");

const ts_source_ast = ts.createSourceFile('temp1.ts', filename1);
const ts_target_ast = ts.createSourceFile('temp1.ts', filename2);
let indent = 0;
let sourceMethods = {}
let targetMethods = {}

let sourceLocations = {}
let targetLocations = {}


let deletedResults = []

let parameterResults = []
let parameterResults2 = []






function reportParametersResultsWarning(results){
    results.forEach(node=>{
        logger.write("\nWARNING: Changed Parameter Names: \n")
        logger.write("Previous version of "+node.key+" at Line " + sourceLocations[node.key]+ " had parameters ["+node.sourceParams+"]\n" )
        logger.write("New version of "+node.key+" at Line " + targetLocations[node.key]+ " has parameters ["+node.targetParams+"]\n" )
      

    })
}

function reportParametersResults(results){
    results.forEach(node=>{
        logger.write("\nBreaking Change :\nChanged Parameter Numbers: \n")     
        logger.write("Previous version of "+node.key+" at Line " + sourceLocations[node.key]+ " had "+node.sourceParams.length+" parameters ["+node.sourceParams+"]\n" )
        logger.write("New version of "+node.key+" at Line " + targetLocations[node.key]+ " has "+node.targetParams.length+" parameters ["+node.targetParams+"]\n" )
      

    })
}

function printDeletedResults(results, sourceLocations){
    for (node of results){
        logger.write("\nBreaking Change :\nDeleted Method name : "+node.name.escapedText + "\nCode location at old file : "+sourceLocations[node.name.escapedText]+"\n" )
    }
}






tree.getFunctionLocations(babel_source_ast, sourceLocations)
tree.getFunctionLocations(babel_target_ast, targetLocations)



 tree.getPublicFunctions(ts_source_ast, sourceMethods)
 tree.getPublicFunctions(ts_target_ast, targetMethods)

 nodeProcessor.getDeletedFunctions(sourceMethods, targetMethods, deletedResults)

printDeletedResults(deletedResults, sourceLocations)

parameterProcessor.getParameterChanges(sourceMethods, targetMethods, parameterResults, parameterResults2)

reportParametersResultsWarning(parameterResults2)
reportParametersResults(parameterResults)