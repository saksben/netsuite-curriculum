/**
 * Concluding Mini-Project: Sales Order Processing Utility
Objective: Build a Suitelet that uses all N/util sub-subjects (each, isObject, extend, generateUUID) to process and manage Sales Order data with a user-friendly interface.

Explanation: This project integrates all N/util methods to create a utility that iterates over Sales Order lines, validates data types, merges settings, and assigns a unique ID, displaying results in a form. It simulates a real-world use case like preparing order data for export or reporting.

Hands-On Coding Challenge:

Create a Suitelet to process a Sales Order with utilities and display results.

Deployment/Viewing Instructions:

Save as util_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the form for line items, type check, settings, and UUID, and the Execution Log for the summary.
Next Steps
Expand: Pair N/util with N/file to write the processed data to a file.
Challenge: Add a condition in each to stop iteration if a quantity exceeds 100.
Deep Dive: Explore util.isArray or util.isFunction for additional type checks.
 */

define(['N/util', 'N/log', 'N/record', 'N/ui/serverWidget'], function(util, log, record, serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({ title: 'Sales Order Processing Utility' });
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });

        // Step 1: Use each to process line items
        var lineCount = salesOrder.getLineCount({ sublistId: 'item' });
        var lineSummary = [];
        util.each(Array.from({ length: lineCount }), function(index) {
            var item = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: index
            });
            var qty = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: index
            });
            lineSummary.push('Item: ' + item + ', Qty: ' + qty);
        });
        form.addField({
            id: 'custpage_lines',
            type: serverWidget.FieldType.TEXTAREA,
            label: 'Line Items'
        }).defaultValue = lineSummary.join('\n');

        // Step 2: Use isObject to check custom data
        var customData = salesOrder.getValue('custbody_custom_data'); // Replace with a valid custom field ID
        var isCustomObject = util.isObject(customData);
        form.addField({
            id: 'custpage_custom_check',
            type: serverWidget.FieldType.TEXT,
            label: 'Is Custom Data an Object?'
        }).defaultValue = isCustomObject ? 'Yes' : 'No';

        // Step 3: Use extend to merge settings
        var defaultSettings = { status: 'Pending', notify: false };
        var orderSettings = { status: 'Processed', priority: 'High' };
        var mergedSettings = util.extend(defaultSettings, orderSettings);
        form.addField({
            id: 'custpage_settings',
            type: serverWidget.FieldType.TEXTAREA,
            label: 'Merged Settings'
        }).defaultValue = JSON.stringify(mergedSettings);

        // Step 4: Use generateUUID for a unique ID
        var uuid = util.generateUUID();
        form.addField({
            id: 'custpage_uuid',
            type: serverWidget.FieldType.TEXT,
            label: 'Unique ID'
        }).defaultValue = uuid;

        log.debug({
            title: 'Processing Summary',
            details: 'Lines: ' + lineSummary.length + ', Custom Object: ' + isCustomObject + 
                     ', Settings: ' + JSON.stringify(mergedSettings) + ', UUID: ' + uuid
        });

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});