module.exports = {
    
    getDeletedFunctions : function (sourceMethods, targetMethods, deletedResults){

        for (var key of Object.keys(sourceMethods)) {
            
            if(!targetMethods.hasOwnProperty(key)){
                deletedResults.push(sourceMethods[key])
            }
            
        }
    
    
    },

    printDeletedResults : function(results, sourceLocations){
        for (node of results){
            console.log("Deleted Method name : "+node.name.escapedText + "\nCode location at old file : "+sourceLocations[node.name.escapedText]+"\n" )
        }
    }
   
   }