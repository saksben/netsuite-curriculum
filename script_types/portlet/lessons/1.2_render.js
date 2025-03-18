/**
 * Lesson 1.2: Creating an Interactive Form with render
Objective: Use render to create a form portlet for submitting a Sales Order ID and displaying its total.

Explanation: This lesson builds on render by creating a form portlet instead of a list, using scriptContext.portlet with addField and handling form submissions via a client script. The clientScriptModulePath property links to a separate client-side script for interactivity. This introduces form-based portlets and client-side processing.

Deployment/Viewing Instructions:

Save the server script as port_form.js and the client script as port_form_client.js in the File Cabinet.
Deploy the Portlet Script (Portlet Type: FORM), referencing the client script (Client Script File field in deployment).
Add to your dashboard (Personalize Dashboard > Custom Portlet), refresh, interact with the form, and check the result.
Hands-On Coding Challenge:
Create a form portlet to input a Sales Order ID and display its total on submission.
 */

// Server-side: port_form.js
define(['N/ui/serverWidget'], function(serverWidget) {
    function render(scriptContext) {
        var portlet = scriptContext.portlet;
        portlet.title = 'Sales Order Total Lookup';
        portlet.clientScriptModulePath = './port_form_client.js'; // Path to client script

        portlet.addField({
            id: 'custpage_so_id',
            type: serverWidget.FieldType.TEXT,
            label: 'Sales Order ID'
        });
        portlet.addField({
            id: 'custpage_submit',
            type: serverWidget.FieldType.BUTTON,
            label: 'Get Total'
        }).updateLayoutType({
            layoutType: serverWidget.FieldLayoutType.NORMAL
        });
        portlet.addField({
            id: 'custpage_result',
            type: serverWidget.FieldType.TEXT,
            label: 'Total'
        }).updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        });
    }
    return { render: render };
});

// Client-side: port_form_client.js
define(['N/https', 'N/ui/message'], function(https, message) {
    function pageInit(scriptContext) {
        // No initialization needed
    }
    function fieldChanged(scriptContext) {
        if (scriptContext.fieldId === 'custpage_submit') {
            var soId = scriptContext.portlet.getValue('custpage_so_id');
            if (soId) {
                // Call a RESTlet or Suitelet for data (simplified here with a mock response)
                var response = https.get({
                    url: '/app/site/hosting/restlet.nl?script=123&deploy=1&id=' + soId // Replace with your RESTlet URL
                });
                var data = JSON.parse(response.body);
                scriptContext.portlet.setValue({
                    fieldId: 'custpage_result',
                    value: data.total || 'Not found'
                });
            } else {
                message.create({
                    title: 'Error',
                    message: 'Please enter a Sales Order ID.',
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