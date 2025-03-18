/**
 * Concluding Mini-Project: Comprehensive Sales Order Manager
Objective: Build a Client Script using all nine entry points to manage Sales Order entry holistically.

Explanation: Integrates all entry points to initialize the form, handle field changes and sourcing, validate inputs and lines, and control saves and deletions, simulating a robust order management assistant.

Hands-On Coding Challenge:

Create a script to set defaults, sync fields, validate dates and quantities, limit lines, and prevent invalid saves or deletions.

Deployment/Viewing Instructions:

Save as cs_sales_order_manager.js in the File Cabinet.
Deploy to Sales Order as described in Lesson 1.1.
Test: Create a Sales Order, set a customer (check Memo), add/edit item lines (validate qty and limits), try future dates, save without required fields, and delete high-quantity lines to see all validations.
Notes
Sandbox: Test in a NetSuite sandbox with Sales Order access.
Permissions: Ensure your role can deploy Client Scripts.
Next Steps: Add N/log for server-side logging or explore other script types (e.g., User Event).
 */

define(['N/currentRecord', 'N/ui/message'], function(currentRecord, message) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.mode === 'create') {
            rec.setValue({ fieldId: 'memo', value: 'Order - ' + new Date().toLocaleDateString() });
            console.log('Initialized in create mode');
        }
    }

    function fieldChanged(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item' && scriptContext.fieldId === 'quantity') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: scriptContext.line
            });
            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                value: 'Qty: ' + qty,
                line: scriptContext.line
            });
        }
    }

    function postSourcing(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'entity') {
            var customerName = rec.getText('entity');
            var memo = rec.getValue('memo') || '';
            rec.setValue({ fieldId: 'memo', value: memo + ' - ' + customerName });
        }
    }

    function validateField(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.fieldId === 'trandate') {
            var orderDate = new Date(rec.getValue('trandate'));
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (orderDate > today) {
                message.create({
                    title: 'Invalid Date',
                    message: 'Order Date cannot be in the future.',
                    type: message.Type.WARNING
                }).show();
                return false;
            }
        }
        return true;
    }

    function validateLine(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            if (!qty || qty < 1) {
                message.create({
                    title: 'Invalid Quantity',
                    message: 'Quantity must be at least 1.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }

    function saveRecord(scriptContext) {
        var rec = currentRecord.get();
        if (!rec.getValue('entity') || rec.getLineCount({ sublistId: 'item' }) < 1) {
            message.create({
                title: 'Save Error',
                message: 'Customer and at least one item are required.',
                type: message.Type.ERROR
            }).show();
            return false;
        }
        return true;
    }

    function lineInit(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var currentDesc = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'description'
            });
            if (!currentDesc) {
                rec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    value: 'Default Line Item'
                });
            }
        }
    }

    function validateInsert(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var lineCount = rec.getLineCount({ sublistId: 'item' });
            if (lineCount >= 5) {
                message.create({
                    title: 'Line Limit',
                    message: 'Cannot add more than 5 item lines.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }

    function validateDelete(scriptContext) {
        var rec = currentRecord.get();
        if (scriptContext.sublistId === 'item') {
            var qty = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            if (qty > 10) {
                message.create({
                    title: 'Deletion Blocked',
                    message: 'Cannot delete lines with quantity over 10.',
                    type: message.Type.ERROR
                }).show();
                return false;
            }
        }
        return true;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        validateField: validateField,
        validateLine: validateLine,
        saveRecord: saveRecord,
        lineInit: lineInit,
        validateInsert: validateInsert,
        validateDelete: validateDelete
    };
});