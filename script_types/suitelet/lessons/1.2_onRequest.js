/**
 * Lesson 1.2: Processing Form Submission with onRequest (POST)
Objective: Use onRequest to process a form submission and display Sales Order details on a POST request.

Explanation: For POST requests, onRequest handles form submissions or data input, accessing parameters via scriptContext.request.parameters. This lesson builds on Lesson 1.1 by processing the submitted Sales Order ID and returning details, demonstrating interactivity.

Deployment/Viewing Instructions:

Save as sl_post_process.js in the File Cabinet.
Deploy as a Suitelet (same as Lesson 1.1).
Open the External URL in a browser, enter a Sales Order ID (e.g., 1001), submit, and check the response page.
Hands-On Coding Challenge:
Display the total and customer for a submitted Sales Order ID.
 */

define(['N/ui/serverWidget', 'N/record'], function(serverWidget, record) {
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
        } else { // POST
            var soId = scriptContext.request.parameters.custpage_so_id;
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: soId
            });
            var form = serverWidget.createForm({
                title: 'Sales Order Details'
            });
            form.addField({
                id: 'custpage_result',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Details'
            }).defaultValue = 'ID: ' + soId + '\nTotal: ' + salesOrder.getValue('total') + 
                            '\nCustomer: ' + salesOrder.getText('entity');
            scriptContext.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});