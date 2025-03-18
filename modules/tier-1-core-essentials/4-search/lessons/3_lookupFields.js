/**
 * Lesson 3: Quick Lookup with search.lookupFields
Objective: Fetch specific field values from a record without loading it fully.

Explanation: search.lookupFields retrieves field data by record type and ID, returning an object with values or text. It’s lightweight and ideal for quick validations or data retrieval without full record operations.

Hands-On Coding Challenge:

Look up a customer’s name and email from a Sales Order.


Deployment/Viewing Instructions:

Save as search3_lookup.js.
Deploy as a User Event Script on Sales Order.
Edit and save a Sales Order, then check the Execution Log for customer details.
 */

define(['N/search', 'N/log'], function(search, log) {
    function beforeSubmit(scriptContext) {
        var salesOrder = scriptContext.newRecord;
        var customerId = salesOrder.getValue('entity');
        var customerData = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customerId,
            columns: ['entityid', 'email']
        });
        log.debug('Customer Info', 'Name: ' + customerData.entityid + 
                 ', Email: ' + customerData.email);
    }
    return {
        beforeSubmit: beforeSubmit
    };
});