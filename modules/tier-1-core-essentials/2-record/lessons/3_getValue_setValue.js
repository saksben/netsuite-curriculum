/**
 * Lesson 3: Modifying Fields with getValue and setValue
Objective: Read and update fields on the current record.

Explanation: getValue retrieves field data, and setValue updates it, both accessible on the scriptContext.newRecord object.

Steps:

Create record3_fields.js


Deploy to Sales Order. Edit and save a Sales Order, then check the Memo field.
Project: Use getValue to check the entity (customer) field and set memo to “Customer ID: [entity]” if it’s not empty.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var subtotal = salesOrder.getValue({
            fieldId: 'subtotal'
        });
        salesOrder.setValue({
            fieldId: 'memo',
            value: 'Subtotal is ' + subtotal
        });
        log.debug('Field Updated', 'Memo set with subtotal: ' + subtotal);
    }
    return {
        beforeSubmit: beforeSubmit
    };
});