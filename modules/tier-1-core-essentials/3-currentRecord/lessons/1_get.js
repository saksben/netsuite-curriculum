/**
 * Lesson 1: Accessing the Current Record with get
Objective: Learn to retrieve the current record object using currentRecord.get.

Explanation: N/currentRecord provides the get method to access the current record in a Client Script. This returns a ClientCurrentRecord object with properties like id (the record’s internal ID) and type (e.g., salesorder). It’s the starting point for interacting with the record in real-time, available in entry points like pageInit or fieldChanged.

Deployment/Viewing Instructions:

Save the script file (e.g., cr1_get.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Client Script record (Customization > Scripting > Scripts > New), set Script Type to Client Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Open or edit a Sales Order in the UI, press F12 to open the browser console, and check for your console.log output (since Client Scripts run in the browser).
Hands-On Coding Challenge:
Log the current Sales Order’s ID and type when the page loads.
 */

define(['N/currentRecord'], function(currentRecord) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        console.log('Current Record ID: ' + rec.id + ', Type: ' + rec.type);
    }
    return {
        pageInit: pageInit
    };
});

