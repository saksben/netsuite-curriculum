/**
 * Concluding Mini-Project: Sales Order Link Generator
Objective: Build a Suitelet using all N/url functions to generate and display various URLs for a Sales Order.

Explanation: Integrates resolveDomain, resolveRecord, resolveScript, and format to create a tool that generates a domain URL, a record view/edit URL, a RESTlet URL, and a parameterized URL for a given Sales Order ID. This simulates a practical utility for navigation or integration.

Hands-On Coding Challenge:

Create a Suitelet to display multiple URL types for a user-entered Sales Order ID.


Deployment/Viewing Instructions:

Save as url_sales_order_links.js in the File Cabinet.
Deploy as a Suitelet (same as Lesson 1.1), note the External URL.
Open the URL in a browser:
Enter a Sales Order ID (e.g., 1001), submit, and verify the generated URLs in the textarea.
Click links to test (ensure a RESTlet exists for resolveScript).
Check the Execution Log for debug details.
Notes
RESTlet Dependency: For resolveScript, replace customscript_rest_sample and customdeploy_rest_sample with IDs from a deployed RESTlet (e.g., from the RESTlet lesson), or omit if unavailable.
Testing: Use a valid Sales Order ID from your sandbox; ensure your role has access to view/edit records.
Security: For production, add validation or authentication checks.
Next Steps: Integrate with N/email to send links, or use in a Portlet for dashboard display.
 */

define(['N/url', 'N/ui/serverWidget', 'N/log'], function(url, serverWidget, log) {
    function onRequest(scriptContext) {
        if (scriptContext.request.method === 'GET') {
            // Render form
            var form = serverWidget.createForm({
                title: 'Sales Order Link Generator'
            });
            form.addField({
                id: 'custpage_so_id',
                type: serverWidget.FieldType.TEXT,
                label: 'Sales Order ID'
            });
            form.addSubmitButton({
                label: 'Generate Links'
            });
            scriptContext.response.writePage(form);
        } else { // POST
            var soId = scriptContext.request.parameters.custpage_so_id;
            var form = serverWidget.createForm({
                title: 'Generated Links for SO ' + soId
            });
            var outputField = form.addField({
                id: 'custpage_links',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Generated URLs'
            });

            // Generate URLs
            var domainUrl = url.resolveDomain({
                hostType: url.HostType.APPLICATION
            });
            var viewUrl = url.resolveRecord({
                recordType: 'salesorder',
                recordId: soId,
                isEditMode: false
            });
            var editUrl = url.resolveRecord({
                recordType: 'salesorder',
                recordId: soId,
                isEditMode: true
            });
            var restletUrl = url.resolveScript({
                scriptId: 'customscript_rest_sample', // Replace with your RESTlet script ID
                deploymentId: 'customdeploy_rest_sample', // Replace with your deployment ID
                returnExternalUrl: true,
                params: { id: soId }
            });
            var customUrl = url.format({
                domain: domainUrl,
                path: '/app/accounting/transactions/salesord.nl',
                params: { id: soId, action: 'custom' }
            });

            // Display URLs
            var output = 'Domain URL: ' + domainUrl + '\n' +
                        'View URL: ' + viewUrl + '\n' +
                        'Edit URL: ' + editUrl + '\n' +
                        'RESTlet URL: ' + restletUrl + '\n' +
                        'Custom URL: ' + customUrl;
            outputField.defaultValue = output;

            log.debug({
                title: 'URL Generator',
                details: 'Generated URLs for SO ID: ' + soId + '\n' + output
            });
            scriptContext.response.writePage(form);
        }
    }
    return { onRequest: onRequest };
});