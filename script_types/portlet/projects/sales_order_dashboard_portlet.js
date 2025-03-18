/**
 * Concluding Mini-Project: Sales Order Dashboard Portlet
Objective: Build a Portlet Script using render to create a hybrid dashboard widget that lists high-value Sales Orders and allows memo updates via a form.

Explanation: Integrates render to combine a list display with an interactive form, leveraging N/search for data retrieval and a client script for form submission. The portlet shows recent high-value Sales Orders and lets users update a memo for a specific order, simulating a practical dashboard tool.

Hands-On Coding Challenge:

Create a portlet to list Sales Orders over $1000 and update their memos interactively.

Deployment/Viewing Instructions:

Save both files (port_dashboard.js and port_dashboard_client.js) in the File Cabinet.
Deploy the Portlet Script with Portlet Type: LIST (despite the form, LIST supports both), link the client script, and set Status: Released.
Add to your dashboard (Personalize Dashboard > Custom Portlet), refresh, and:
See the list of high-value Sales Orders.
Enter a Sales Order ID and new memo, click “Update Memo,” and verify the result field updates.
Check the Execution Log for debug messages if issues arise.
Notes
Dependencies: The client script assumes a RESTlet for updates (from the RESTlet lesson). Replace the URL with your deployed RESTlet’s External URL, or simplify to display-only if no RESTlet exists.
Permissions: Ensure your role can view Sales Orders and deploy portlets.
Testing: Use valid Sales Order IDs from your sandbox; adjust thresholds (e.g., $1000) as needed.
Next Steps: Add links to Sales Orders in the list (portlet.addRows) or integrate with N/email for notifications.
 */

// Server-side: port_dashboard.js
define(['N/ui/serverWidget', 'N/search'], function(serverWidget, search) {
    function render(scriptContext) {
        var portlet = scriptContext.portlet;
        portlet.title = 'Sales Order Dashboard';
        portlet.clientScriptModulePath = './port_dashboard_client.js';

        // List section
        portlet.addColumn({
            id: 'id',
            type: 'text',
            label: 'Sales Order ID',
            align: 'LEFT'
        });
        portlet.addColumn({
            id: 'total',
            type: 'currency',
            label: 'Total',
            align: 'RIGHT'
        });
        var soSearch = search.create({
            type: 'salesorder',
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['total', 'greaterthan', 1000]
            ],
            columns: [
                search.createColumn({ name: 'internalid', sort: search.Sort.DESC }),
                'total'
            ]
        });
        var count = 0;
        soSearch.run().each(function(result) {
            portlet.addRow({
                id: result.getValue('internalid'),
                total: result.getValue('total')
            });
            count++;
            return count < 5; // Limit to 5
        });

        // Form section
        portlet.addField({
            id: 'custpage_so_id',
            type: serverWidget.FieldType.TEXT,
            label: 'Update Sales Order ID'
        });
        portlet.addField({
            id: 'custpage_new_memo',
            type: serverWidget.FieldType.TEXT,
            label: 'New Memo'
        });
        portlet.addField({
            id: 'custpage_update',
            type: serverWidget.FieldType.BUTTON,
            label: 'Update Memo'
        });
        portlet.addField({
            id: 'custpage_result',
            type: serverWidget.FieldType.TEXT,
            label: 'Result'
        }).updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        });
    }
    return { render: render };
});

// Client-side: port_dashboard_client.js
define(['N/https', 'N/ui/message', 'N/log'], function(https, message, log) {
    function pageInit(scriptContext) {
        // No initialization needed
    }
    function fieldChanged(scriptContext) {
        if (scriptContext.fieldId === 'custpage_update') {
            var soId = scriptContext.portlet.getValue('custpage_so_id');
            var newMemo = scriptContext.portlet.getValue('custpage_new_memo');
            if (soId && newMemo) {
                try {
                    var response = https.put({
                        url: '/app/site/hosting/restlet.nl?script=123&deploy=1', // Replace with your RESTlet URL
                        body: JSON.stringify({ id: soId, memo: newMemo }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    var data = JSON.parse(response.body);
                    scriptContext.portlet.setValue({
                        fieldId: 'custpage_result',
                        value: 'Memo updated for SO ' + soId
                    });
                    log.debug({
                        title: 'Memo Update',
                        details: 'Updated SO ' + soId + ' with memo: ' + newMemo
                    });
                    // Refresh the page to update the list (optional)
                    setTimeout(function() { window.location.reload(); }, 1000);
                } catch (e) {
                    message.create({
                        title: 'Error',
                        message: 'Failed to update: ' + e.message,
                        type: message.Type.ERROR
                    }).show();
                }
            } else {
                message.create({
                    title: 'Error',
                    message: 'Please enter both Sales Order ID and New Memo.',
                    type: message.Type.ERROR
                }).show();
            }
        }
    }
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});