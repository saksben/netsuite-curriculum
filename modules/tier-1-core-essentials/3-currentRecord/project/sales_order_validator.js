/**
 * Concluding Mini-Project: Real-Time Sales Order Validator
Objective: Build a Client Script that uses all N/currentRecord methods and properties to validate and enhance a Sales Order in real-time.

Explanation: This project integrates get, getValue, setValue, getField, getSublistValue, and setSublistValue to validate fields and sublists, update the UI dynamically, and log results. It simulates a practical use case like ensuring data integrity or providing user feedback.

Hands-On Coding Challenge:

Create a script to validate the customer, total, and first line item, updating fields and sublists accordingly.


Deployment/Viewing Instructions:

Save as cr_mini_project.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Open or edit a Sales Order, change the customer or a line item’s quantity, and observe the UI updates (e.g., Memo, Description) and console logs (F12).
Next Steps
Expand: Pair N/currentRecord with N/search to look up related data (e.g., customer details).
Challenge: Add validation in saveRecord to block saving if conditions fail.
Deep Dive: Explore sublist methods like selectLine or insertLine (if available in your version).
 */

define(['N/currentRecord', 'N/ui/dialog'], function(currentRecord, dialog) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        console.log('Validating Sales Order ID: ' + rec.id + ', Type: ' + rec.type);

        // Check customer field
        var customerId = rec.getValue('entity');
        if (!customerId) {
            dialog.alert({ title: 'Warning', message: 'Please select a customer!' });
        }

        // Check total field properties
        var totalField = rec.getField('total');
        console.log('Total Field - Read Only: ' + totalField.isReadOnly);
    }

    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        
        // Update memo when customer changes
        if (scriptContext.fieldId === 'entity') {
            var customerId = rec.getValue('entity');
            rec.setValue({
                fieldId: 'memo',
                value: 'Customer updated to ID: ' + customerId
            });
            console.log('Memo set for Customer ID: ' + customerId);
        }

        // Update sublist description when quantity changes
        if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {
            var line = scriptContext.line;
            var quantity = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: line
            });
            var itemId = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: line
            });
            rec.setSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                line: line,
                value: 'Item ' + itemId + ' qty set to ' + quantity
            });
            console.log('Line ' + line + ' updated: Qty ' + quantity);
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});