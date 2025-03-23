/**
 * Concluding Mini-Project: Sales Order Context-Aware Validator
Objective: Build a Client Script that uses all N/recordContext sub-subjects (getContext, ContextTypes, fieldIds, sublistId) to validate and log Sales Order interactions based on context.

Explanation: This project integrates all N/recordContext methods and properties to create a validator that adapts to the UI mode (create/edit/view), logs field and sublist changes, and provides user feedback. It simulates a practical use case like enforcing rules or tracking user actions in real-time.

Hands-On Coding Challenge:

Create a Client Script to monitor and validate Sales Order context, fields, and sublists.


Deployment/Viewing Instructions:

Save as rc_mini_project.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Create, edit, or view a Sales Order, change fields (e.g., Customer) or sublist values (e.g., Quantity), and observe UI alerts and console logs (F12).
Next Steps
Expand: Pair N/recordContext with N/runtime to log execution context alongside UI context.
Challenge: Use saveRecord to block saving based on contextType conditions.
Deep Dive: Explore additional properties like eventType (if available in your version) for finer event details.
 */

define(['N/recordContext', 'N/currentRecord', 'N/ui/dialog'], function(recordContext, currentRecord, dialog) {
    function pageInit(scriptContext) {
        var context = recordContext.getContext();
        var rec = currentRecord.get();
        var modeMessage;

        // Use ContextTypes to determine mode
        switch (context.contextType) {
            case recordContext.ContextTypes.CREATE:
                modeMessage = 'Creating Sales Order - Please fill all required fields';
                dialog.alert({ title: 'New Order', message: modeMessage });
                break;
            case recordContext.ContextTypes.EDIT:
                modeMessage = 'Editing Sales Order ID: ' + rec.id;
                break;
            case recordContext.ContextTypes.VIEW:
                modeMessage = 'Viewing Sales Order ID: ' + rec.id;
                break;
        }
        console.log('Page Init - ' + modeMessage);
    }

    function fieldChanged(scriptContext) {
        var context = recordContext.getContext();
        var rec = currentRecord.get();
        var changedFields = context.fieldIds || [];
        var sublist = context.sublistId;

        // Log field changes
        if (changedFields.length > 0) {
            console.log('Fields Changed: ' + changedFields.join(', '));
            if (changedFields.includes('entity') && !rec.getValue('entity')) {
                dialog.alert({ title: 'Warning', message: 'Customer is required!' });
            }
        }

        // Log sublist changes
        if (sublist) {
            var line = scriptContext.line;
            var quantity = rec.getSublistValue({
                sublistId: sublist,
                fieldId: 'quantity',
                line: line
            });
            console.log('Sublist ' + sublist + ' changed at line ' + line + 
                       ', Quantity: ' + quantity);
            if (quantity <= 0) {
                rec.setSublistValue({
                    sublistId: sublist,
                    fieldId: 'description',
                    line: line,
                    value: 'Invalid quantity!'
                });
            }
        }
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});