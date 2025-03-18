/**
 * Lesson 3.1: Aggregating Data with reduce
Objective: Use reduce to aggregate or update Sales Orders based on mapped data.

Explanation: The reduce stage processes grouped key-value pairs from map, receiving scriptContext with key and values (array). It’s used for aggregation or record updates. This lesson updates a custom field based on the mapped tag.

Deployment/Viewing Instructions: Same as Lesson 1.1; run and check Sales Orders for updates and the Execution Log.

Hands-On Coding Challenge:

Update a custom status field with the tag from the map stage.
 */

define(['N/record', 'N/log'], function(record, log) {
    function reduce(scriptContext) {
        var soId = scriptContext.key;
        var tag = scriptContext.values[0]; // Single value per key in this case
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: soId
        });
        salesOrder.setValue({
            fieldId: 'custbody_status', // Replace with a valid custom field ID
            value: tag
        });
        salesOrder.save();
        log.debug({
            title: 'Reduce Stage',
            details: 'Updated SO ID: ' + soId + ' with status: ' + tag
        });
    }
    return { reduce: reduce };
});