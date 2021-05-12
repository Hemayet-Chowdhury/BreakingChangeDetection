module.exports = {

    getParameterChanges : function(sourceMethods, targetMethods, parameterResults, parameterResults2){
        let sourceParams = []
        let targetParams = []
        sMethods = Object.keys(sourceMethods)
        tMethods = Object.keys(targetMethods)
        for (var key of sMethods){
            if(tMethods.includes(key)){
                sourceNode = sourceMethods[key].parameters
                targetNode = targetMethods[key].parameters
                sourceParams = []
                targetParams = []
                for(var parameter of sourceNode){
                    sourceParams.push(parameter.name.escapedText)
                }
                for(var parameter of targetNode){
                    targetParams.push(parameter.name.escapedText)
                }
               
                if(sourceParams.length!=targetParams.length){
                    let result = {sourceParams : sourceParams,targetParams: targetParams,key:key, sourceNode: sourceMethods[key], targetNode: targetMethods[key]}
                    parameterResults.push(result)
                }
                else{
                    var flag = false
                    for(var i=0; i<sourceParams.length; i++){
                        if(sourceParams[i]!=targetParams[i]){
                            flag = true
                        }
                    }
                    if(flag==true){
                        let result = {sourceParams : sourceParams,targetParams: targetParams,key:key, sourceNode: sourceMethods[key], targetNode: targetMethods[key]}
                        parameterResults2.push(result)
                    }
                }
               
            }
        }
         
        
    }
}