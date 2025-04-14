/**
 * Lesson 1: Creating a Custom Form with createForm
Objective: Learn to create a custom form using serverWidget.createForm.

Explanation: serverWidget.createForm generates a new form object for Suitelets or modifies an existing form in User Event Scripts (beforeLoad). It takes a title parameter and returns a Form object you can enhance with fields, buttons, or sublists. This is the foundation for custom UI in NetSuite.
serverWidget works with the UI. Great for use with Suitelets. Basically the backend of any frontend stuff I want to create.
Key features are:
    Forms: create custom forms with fields, buttons, and sublists
    Lists: display tabular data with columns and rows (a table)
    Assistants: build multi-step wizards to guide users through processes
    Tabs and Sublists: organize content with tabs or editable sublists
    Fields and Buttons: add interactive elements like text inputs, dropdowns, or action buttons

Deployment/Viewing Instructions:

Save the script file (e.g., sw1_createform.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL in your browser to view the custom form.
Hands-On Coding Challenge:
Create a Suitelet with a basic form titled "My First Form".
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({
            title: 'My First Form'
        });
        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});