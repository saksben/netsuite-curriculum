/**
 * Lesson 1.1: Rendering a Form with onRequest (GET)
Objective: Use onRequest to display a form for Sales Order lookup on a GET request.

Explanation: The onRequest entry point is the sole handler for Suitelet requests, receiving scriptContext with request and response objects. For GET requests, it’s commonly used to render a UI form using N/ui/serverWidget. This lesson focuses on building a simple input form.

Deployment/Viewing Instructions:

Save as sl_get_form.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script (Customization > Scripting > Scripts > New), set Script Type to Suitelet, link the file, and deploy (Status: Released).
Note the External URL from the deployment (Customization > Scripting > Script Deployments).
Open the URL in a browser, verify the form displays.
Hands-On Coding Challenge:
Create a form with a field for Sales Order ID and a submit button.
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(scriptContext) {
        if (scriptContext.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'Sales Order Lookup'
            });
            form.addField({
                id: 'custpage_so_id',
                type: serverWidget.FieldType.TEXT,
                label: 'Sales Order ID'
            });
            form.addSubmitButton({
                label: 'Lookup'
            });
            scriptContext.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});