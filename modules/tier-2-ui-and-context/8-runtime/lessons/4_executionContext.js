/**
 * Lesson 4: Understanding Execution Context with executionContext
Objective: Use runtime.executionContext to identify how the script was triggered.

Explanation: runtime.executionContext returns a value from runtime.ContextType (e.g., USER_INTERFACE, SCHEDULED, RESTLET), showing the script’s trigger source. This helps adapt logic to the context (e.g., UI vs. backend). It’s key for multi-purpose scripts.

Deployment/Viewing Instructions:

Save as rt4_context.js in the File Cabinet.
Deploy as a User Event Script on Sales Order with Status: Testing.
Edit and save a Sales Order, then check the Execution Log for the context (should be USER_INTERFACE).
Hands-On Coding Challenge:
Log the execution context when a Sales Order is submitted.
 */

define(['N/runtime', 'N/log'], function(runtime, log) {
    function afterSubmit(scriptContext) {
        var context = runtime.executionContext;
        log.debug({
            title: 'Execution Context',
            details: 'Script triggered by: ' + context
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});