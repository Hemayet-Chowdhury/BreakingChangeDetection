const fs = require("fs");
const ts = require("typescript");
const tree = require('./tree');
var _ = require('lodash');
const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff");

var sourceString = "./old_output.js"
var targetString = "./new_output.js"

let filename1 = fs.readFileSync(sourceString, "utf8");
let filename2 = fs.readFileSync(targetString, "utf8");

let sourceMethods = {}
let targetMethods = {}


const ts_source_ast = ts.createSourceFile('temp1.ts', filename1);
const ts_target_ast = ts.createSourceFile('temp1.ts', filename2);

tree.getPublicFunctions(ts_source_ast, sourceMethods)
tree.getPublicFunctions(ts_target_ast, targetMethods)

//console.log(_.isEqual(sourceMethods['decrementAndAdd'], targetMethods['decrementAndAdd']))
var sourceKeys = Object.keys(sourceMethods)
var targetKeys = Object.keys(targetMethods)
var res = []
var commonKeys = []
for (sourceKey of sourceKeys){
    if(targetKeys.includes(sourceKey)){
       commonKeys.push(sourceKey)
    }
}

// for (sourceKey of sourceKeys){
//     if(targetKeys.includes(sourceKey)){
//         var added = addedDiff(sourceMethods[sourceKey], targetMethods[sourceKey])
//         var deleted = deletedDiff(sourceMethods[sourceKey], targetMethods[sourceKey])
//         console.log(sourceKey)
//         console.log(added)
//         console.log(deleted)
        
//         if(Object.keys(added).length != 0 ||Object.keys(deleted).length != 0 ){
//             res.push(sourceKey)
//         }

//     }
// }

var myKey = commonKeys[0]

//console.log(addedDiff(sourceMethods[myKey], targetMethods[myKey]))



// console.log("common keys : " + commonKeys.length)
// console.log("total source keys : " + sourceKeys.length)
// console.log("total target keys : " + targetKeys.length)
var deepDiffMapper = function () {
    return {
      VALUE_CREATED: 'created',
      VALUE_UPDATED: 'updated',
      VALUE_DELETED: 'deleted',
      VALUE_UNCHANGED: 'unchanged',
      map: function(obj1, obj2) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
          throw 'Invalid argument. Function given, object expected.';
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
          return {
            type: this.compareValues(obj1, obj2),
            data: obj1 === undefined ? obj2 : obj1
          };
        }
  
        var diff = {};
        for (var key in obj1) {
          if (this.isFunction(obj1[key])) {
            continue;
          }
  
          var value2 = undefined;
          if (obj2[key] !== undefined) {
            value2 = obj2[key];
          }
  
          diff[key] = this.map(obj1[key], value2);
        }
        for (var key in obj2) {
          if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
            continue;
          }
  
          diff[key] = this.map(undefined, obj2[key]);
        }
  
        return diff;
  
      },
      compareValues: function (value1, value2) {
        if (value1 === value2) {
          return this.VALUE_UNCHANGED;
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
          return this.VALUE_UNCHANGED;
        }
        if (value1 === undefined) {
          return this.VALUE_CREATED;
        }
        if (value2 === undefined) {
          return this.VALUE_DELETED;
        }
        return this.VALUE_UPDATED;
      },
      isFunction: function (x) {
        return Object.prototype.toString.call(x) === '[object Function]';
      },
      isArray: function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      },
      isDate: function (x) {
        return Object.prototype.toString.call(x) === '[object Date]';
      },
      isObject: function (x) {
        return Object.prototype.toString.call(x) === '[object Object]';
      },
      isValue: function (x) {
        return !this.isObject(x) && !this.isArray(x);
      }
    }
  }();

  //var result = deepDiffMapper.map(sourceMethods[myKey], targetMethods[myKey]v)
console.log(sourceMethods[myKey])