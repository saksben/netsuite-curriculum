/**
 * Lesson 3: Adding a Button with addButton
Objective: Add a custom button to a form using addButton.

Explanation: addButton adds a clickable button to a Form object, with id, label, and functionName (a client-side function to trigger). It’s used in User Event Scripts or Suitelets to trigger actions, requiring a Client Script for functionality.

Deployment/Viewing Instructions:

Save as sw3_addbutton.js in the File Cabinet.
Deploy as a User Event Script on Sales Order (Status: Testing, applied to your role).
Load a Sales Order in the UI to see the button (clicking it logs to the console).
Hands-On Coding Challenge:
Add a button to a Sales Order form that logs a message when clicked.
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function beforeLoad(scriptContext) {
        var form = scriptContext.form;
        form.clientScriptModulePath = './sw3_client.js'; // Client Script path
        form.addButton({
            id: 'custpage_logbutton',
            label: 'Log Message',
            functionName: 'logMessage'
        });
    }
    return {
        beforeLoad: beforeLoad
    };
});

// Client Script (sw3_client.js)
define([], function() {
    function logMessage() {
        console.log('Button clicked!');
    }
    return {
        logMessage: logMessage
    };
});