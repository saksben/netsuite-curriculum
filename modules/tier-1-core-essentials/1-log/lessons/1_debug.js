/**
 * Lesson 1: Logging Basic Information with log.debug
Objective: Learn to log basic messages for debugging purposes using log.debug.

Explanation: The N/log module provides methods to record script execution details in NetSuite’s Execution Log (Customization > Scripting > Script Deployments). log.debug is the most common method, used for general debugging with a title (a short string) and details (a string or object for more info). It’s only visible when the script’s log level is set to DEBUG or higher in the deployment. This is your first step to seeing script output in the sandbox.

Deployment/Viewing Instructions:

Save the script file (e.g., log1_debug.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record (Customization > Scripting > Scripts > New), set Script Type to User Event Script, and link your file.
Deploy it to a record type (e.g., Sales Order) via Customization > Scripting > Script Deployments. Set Status to Testing, Log Level to DEBUG, and apply it to your user role.
Trigger the script (e.g., save a Sales Order), then check the Execution Log tab on the Script Deployment page for output.

Hands-On Coding Challenge:
Write a script to log a simple message when a Sales Order is saved.
 */

define(['N/log'], function(log) {
    function afterSubmit(scriptContext) {
        log.debug({
            title: 'Script Started',
            details: 'The afterSubmit function has been triggered.'
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});