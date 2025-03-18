/**
 * Lesson 3: Checking the Environment with envType
Objective: Determine the NetSuite environment type using runtime.envType.

Explanation: runtime.envType returns a string (e.g., SANDBOX, PRODUCTION) indicating the environment. This is crucial for environment-specific logic (e.g., testing in sandbox vs. live in production). It’s a simple property but powerful for deployment safety.

Deployment/Viewing Instructions:

Save as rt3_envtype.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Save a Sales Order and check the Execution Log for the environment type.
Hands-On Coding Challenge:
Log the environment type when a Sales Order is saved.
 */

define(['N/runtime', 'N/log'], function(runtime, log) {
    function afterSubmit(scriptContext) {
        var env = runtime.envType;
        log.debug({
            title: 'Environment Check',
            details: 'Running in: ' + env
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});