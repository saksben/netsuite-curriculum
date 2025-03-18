/**
 * Lesson 4.1: Deleting Data with delete
Objective: Use delete to remove a Sales Order based on a request parameter.

Explanation: The delete entry point handles HTTP DELETE requests, receiving a context object with parameters. It’s used to delete records, returning a success message. Note: Deleting Sales Orders may be restricted by NetSuite permissions or status; test with deletable records or adjust to a custom record type if needed.

Deployment/Viewing Instructions:

Save as rest_delete.js in the File Cabinet.
Deploy as a RESTlet (same as Lesson 1.1).
Test with Postman: DELETE <External URL>?id=1001 (replace with a deletable Sales Order ID), check the response.
Hands-On Coding Challenge:
Delete a Sales Order and confirm deletion.
 */

define(['N/record'], function(record) {
    function deleteFunc(context) {  // 'delete' is a reserved word, use deleteFunc
        var salesOrderId = context.id;
        record.delete({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        return { id: salesOrderId, status: 'Sales Order deleted' };
    }
    return { 'delete': deleteFunc };
});