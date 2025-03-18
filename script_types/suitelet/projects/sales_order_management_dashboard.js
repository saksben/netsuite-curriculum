/**
 * Concluding Mini-Project: Sales Order Management Dashboard
Objective: Build a Suitelet using onRequest to create a dashboard that displays a Sales Order form (GET) and processes updates or lookups (POST).

Explanation: Integrates onRequest handling for both GET and POST to create a functional dashboard. On GET, it renders a form for lookup or update; on POST, it processes the action (lookup or update) based on user input, logs the activity, and displays results. This simulates a real-world tool for managing Sales Orders.

Hands-On Coding Challenge:

Create a Suitelet to look up Sales Order details or update its memo, with logging and error handling.

Deployment/Viewing Instructions:

Save as sl_sales_order_dashboard.js in the File Cabinet.
Deploy as a Suitelet (same as Lesson 1.1), note the External URL.
Open the URL in a browser:
On GET: See a form with Sales Order ID, memo input, and action dropdown.
On POST: Enter a Sales Order ID (e.g., 1001), optionally a new memo, select “Lookup” or “Update Memo,” submit, and verify the result page.
Check the Execution Log for debug and error messages.
Notes
Testing: Use valid Sales Order IDs from your sandbox; ensure your role has edit permissions for updates.
UI: The form uses basic fields; enhance with N/search for dropdowns or N/ui/message for alerts if desired.
Security: For production, add authentication checks (e.g., scriptContext.request.headers).
Next Steps: Extend with file downloads (N/file) for results or integrate with N/email for notifications.
 */

define(['N/ui/serverWidget', 'N/record', 'N/log', 'N/error'], function(serverWidget, record, log, error) {
    function onRequest(scriptContext) {
        if (scriptContext.request.method === 'GET') {
            // Render the form
            var form = serverWidget.createForm({
                title: 'Sales Order Management Dashboard'
            });
            form.addField({
                id: 'custpage_so_id',
                type: serverWidget.FieldType.TEXT,
                label: 'Sales Order ID'
            });
            form.addField({
                id: 'custpage_new_memo',
                type: serverWidget.FieldType.TEXT,
                label: 'New Memo (Optional)'
            });
            form.addField({
                id: 'custpage_action',
                type: serverWidget.FieldType.SELECT,
                label: 'Action'
            }).addSelectOption({ value: 'lookup', text: 'Lookup' })
             .addSelectOption({ value: 'update', text: 'Update Memo' });
            form.addSubmitButton({
                label: 'Submit'
            });
            scriptContext.response.writePage(form);
        } else { // POST
            var soId = scriptContext.request.parameters.custpage_so_id;
            var newMemo = scriptContext.request.parameters.custpage_new_memo;
            var action = scriptContext.request.parameters.custpage_action;
            var form = serverWidget.createForm({
                title: 'Sales Order Management Result'
            });

            try {
                var salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: soId
                });

                if (action === 'update' && newMemo) {
                    salesOrder.setValue({
                        fieldId: 'memo',
                        value: newMemo
                    });
                    salesOrder.save();
                    log.debug({
                        title: 'Memo Updated',
                        details: 'Sales Order ' + soId + ' memo set to: ' + newMemo
                    });
                    form.addField({
                        id: 'custpage_result',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Result'
                    }).defaultValue = 'Updated Sales Order ' + soId + '\nNew Memo: ' + newMemo;
                } else { // Lookup
                    var details = 'ID: ' + soId + 
                                '\nTotal: ' + salesOrder.getValue('total') + 
                                '\nCustomer: ' + salesOrder.getText('entity') + 
                                '\nMemo: ' + salesOrder.getValue('memo');
                    log.debug({
                        title: 'Lookup Performed',
                        details: 'Retrieved details for Sales Order ' + soId
                    });
                    form.addField({
                        id: 'custpage_result',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Sales Order Details'
                    }).defaultValue = details;
                }
            } catch (e) {
                log.error({
                    title: 'Error Processing Request',
                    details: e.message
                });
                form.addField({
                    id: 'custpage_error',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Error'
                }).defaultValue = 'Error: ' + e.message;
            }

            // Add a button to return to the form
            form.addButton({
                id: 'custpage_back',
                label: 'Back',
                functionName: 'window.location.reload()'
            });
            scriptContext.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});