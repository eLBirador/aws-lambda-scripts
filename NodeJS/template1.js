var aws = require('aws-sdk')
var response = require('cfn-response')
exports.handler = function(event, context) {
    console.log("REQUEST RECEIVED:\n" + JSON.stringify(event))
    // For Delete requests, immediately send a SUCCESS response.
    if (event.RequestType == "Delete") {
        response.send(event, context, "SUCCESS")
        return
    }
    var responseStatus = "FAILED"
    var responseData = {}
    var functionName = event.ResourceProperties.FunctionName
    var lambda = new aws.Lambda()
    lambda.invoke({ FunctionName: functionName }, function(err, invokeResult) {
        if (err) {
            responseData = {Error: "Invoke call failed"}
            console.log(responseData.Error + ":\n", err)
        }
        else responseStatus = "SUCCESS"
        response.send(event, context, responseStatus, responseData)
    })
}