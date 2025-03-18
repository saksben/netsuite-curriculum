/**
 * Lesson 1: Loading and Inspecting a Record
Objective: Use record.load to load a record and explore its properties.

Explanation: record.load retrieves a record by type and ID, giving you access to its fields and properties like id, type, and isDynamic.

Steps:

Create a User Event Script file, record1_load.js


Deploy to Sales Order with Status: Testing.
Open a Sales Order, check the Execution Log for the output.
Project: Log the value of a specific field (e.g., salesOrder.getValue('subtotal')) and the record’s isDynamic property.
 */

define(['N/record', 'N/log'], function(record, log) {
    function beforeLoad(scriptContext) {
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: 123, // Replace with a valid Sales Order ID from your sandbox
            isDynamic: false
        });
        log.debug({
            title: 'Loaded Record',
            details: 'ID: ' + salesOrder.id + ', Type: ' + salesOrder.type
        });
    }
    return {
        beforeLoad: beforeLoad
    };
});