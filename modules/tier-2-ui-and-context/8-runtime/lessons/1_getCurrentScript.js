/**
 * Lesson 1: Accessing Script Details with getCurrentScript
Objective: Learn to retrieve script metadata using runtime.getCurrentScript.

Explanation: runtime.getCurrentScript returns a Script object with properties like id (script ID), deploymentId, and methods like getParameter to access script parameters. It’s useful for debugging or adapting logic based on the script’s configuration. This is a foundational runtime method available across all script types.

Deployment/Viewing Instructions:

Save the script file (e.g., rt1_getscript.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record (Customization > Scripting > Scripts > New), set Script Type to User Event Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Save a Sales Order, then check the Execution Log (Customization > Scripting > Script Deployments) for the output.
Hands-On Coding Challenge:
Log the script ID and deployment ID when a Sales Order is saved.
 */

define(['N/runtime', 'N/log'], function(runtime, log) {
    function afterSubmit(scriptContext) {
        var script = runtime.getCurrentScript();
        log.debug({
            title: 'Script Info',
            details: 'Script ID: ' + script.id + ', Deployment ID: ' + script.deploymentId
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});