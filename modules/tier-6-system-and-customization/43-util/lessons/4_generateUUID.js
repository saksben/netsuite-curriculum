/**
 * Lesson 4: Generating Unique IDs with generateUUID
Objective: Use util.generateUUID to create a unique identifier.

Explanation: util.generateUUID generates a universally unique identifier (UUID) as a string (e.g., 550e8400-e29b-41d4-a716-446655440000). This is useful for creating unique keys, tracking events, or tagging data without relying on NetSuite internal IDs. It’s simple but powerful for custom workflows.

Deployment/Viewing Instructions:

Save as util4_uuid.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the generated UUID.
Hands-On Coding Challenge:
Generate a UUID for a Sales Order and log it.
 */

define(['N/util', 'N/log'], function(util, log) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var uuid = util.generateUUID();
        log.debug({
            title: 'Generated UUID',
            details: 'UUID for Sales Order ' + salesOrderId + ': ' + uuid
        });
        scriptContext.response.write('UUID generated. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});