/**
 * Lesson 2: Reading Field Values with getValue
Objective: Use getValue to retrieve field values from the current record.

Explanation: getValue gets the value of a specified field (e.g., entity, total) from the current record. It takes a fieldId parameter and returns the raw value (e.g., internal ID for lookups, text for text fields). This is key for real-time data access in Client Scripts.

Deployment/Viewing Instructions:

Save as cr2_getvalue.js in the File Cabinet.
Deploy as a Client Script on Sales Order with Status: Testing.
Load a Sales Order and check the browser console (F12) for output.
Hands-On Coding Challenge:
Log the customer and total when the page initializes.
 */

define(['N/currentRecord'], function(currentRecord) {
    function pageInit(scriptContext) {
        var rec = currentRecord.get();
        var customerId = rec.getValue('entity');
        var total = rec.getValue('total');
        console.log('Customer ID: ' + customerId + ', Total: ' + total);
    }
    return {
        pageInit: pageInit
    };
});