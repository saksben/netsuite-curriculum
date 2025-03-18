/**
 * Lesson 2.1: Processing Records with map
Objective: Use map to process each Sales Order and emit key-value pairs.

Explanation: The map stage processes each record from getInputData, receiving scriptContext with key (record ID) and value (search result). It emits key-value pairs to the reduce stage using scriptContext.write. This lesson tags high-value orders.

Deployment/Viewing Instructions: Same as Lesson 1.1; run the script and check the Execution Log for map outputs.

Hands-On Coding Challenge:

Emit Sales Order IDs with a “High Value” tag if total exceeds 1000.
 */

define(['N/log'], function(log) {
    function map(scriptContext) {
        var value = JSON.parse(scriptContext.value); // Search result
        var total = parseFloat(value.values.total);
        var soId = value.id;
        var tag = total > 1000 ? 'High Value' : 'Standard';
        scriptContext.write({
            key: soId,
            value: tag
        });
        log.debug({
            title: 'Map Stage',
            details: 'SO ID: ' + soId + ', Tag: ' + tag
        });
    }
    return { map: map };
});