/**
 * Lesson 3.1: Updating Data with put
Objective: Use put to update an existing Sales Order based on request data.

Explanation: The put entry point handles HTTP PUT requests, receiving a context object with the request body. It’s used to update existing records, returning confirmation or updated data.

Deployment/Viewing Instructions:

Save as rest_put.js in the File Cabinet.
Deploy as a RESTlet (same as Lesson 1.1).
Test with Postman: PUT <External URL> with a JSON body (e.g., {"id": "1001", "memo": "Updated via RESTlet"}), check the response.
Hands-On Coding Challenge:
Update a Sales Order’s Memo field and return the updated value.
 */

define(['N/record'], function(record) {
    function put(context) {
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: context.id
        });
        salesOrder.setValue({ fieldId: 'memo', value: context.memo });
        salesOrder.save();
        return {
            id: context.id,
            updatedMemo: context.memo,
            status: 'Sales Order updated'
        };
    }
    return { put: put };
});