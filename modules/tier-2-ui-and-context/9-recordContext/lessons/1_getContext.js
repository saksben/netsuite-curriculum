/**
 * Lesson 1: Accessing Record Context with getContext
Objective: Learn to retrieve the current record’s context using recordContext.getContext.

Explanation: recordContext.getContext returns a RecordContext object that provides details about the record’s state in the UI, such as the contextType (e.g., CREATE, EDIT, VIEW) and associated field or sublist data. It’s available in Client Script entry points like pageInit or fieldChanged, complementing N/currentRecord by offering UI-specific metadata.

Deployment/Viewing Instructions:

Save the script file (e.g., rc1_getcontext.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Client Script record (Customization > Scripting > Scripts > New), set Script Type to Client Script, and link your file.
Deploy it to Sales Order (Customization > Scripting > Script Deployments), set Status to Testing, and apply it to your user role.
Open, edit, or create a Sales Order, then check the browser console (F12) for the output.
Hands-On Coding Challenge:
Log the context type when the Sales Order page loads.
 */

define(['N/recordContext'], function(recordContext) {
    function pageInit(scriptContext) {
        var context = recordContext.getContext();
        console.log('Context Type: ' + context.contextType);
    }
    return {
        pageInit: pageInit
    };
});