/**
 * Below is a SuiteScript lesson plan for the N/error module in the "curriculum format" you’ve specified. It includes:

Lesson Number and Name
Objective
Explanation (with deployment/viewing instructions immediately following)
Hands-On Coding Challenge
Concluding Mini-Project (integrating all sub-subjects at the end)
The N/error module enables SuiteScript to create and throw custom errors, enhancing exception handling and user feedback. This plan covers its primary sub-subjects (create, error properties like name, message, id, and throwing errors with throw), escalating in complexity to build your skills hands-on in your NetSuite sandbox. The module is small but critical for robust error management.

SuiteScript Lesson Plan: Mastering the N/error Module
Lesson 1: Creating a Custom Error with create
Objective: Learn to create a custom error object using error.create.

Explanation: error.create generates a SuiteScriptError object with properties like name (error type), message (description), and optional id (unique identifier). This allows you to define specific errors for your script logic, making debugging and user feedback more precise. Common name values include SSS_ prefixed custom strings (e.g., SSS_INVALID_INPUT).

Deployment/Viewing Instructions:

Save the script file (e.g., err1_create.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL, then check the Execution Log for the error details.
Hands-On Coding Challenge:
Create a custom error for an invalid Sales Order ID and log it.
 */

define(['N/error', 'N/log'], function(error, log) {
    function onRequest(scriptContext) {
        var customError = error.create({
            name: 'SSS_INVALID_SALES_ORDER',
            message: 'The provided Sales Order ID is invalid.',
            id: 'SO_001'
        });
        log.debug({
            title: 'Custom Error Created',
            details: 'Name: ' + customError.name + ', Message: ' + customError.message + ', ID: ' + customError.id
        });
        scriptContext.response.write('Custom error created. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});