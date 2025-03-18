/**
 * Lesson 2.1: Creating Data with post
Objective: Use post to create a new Sales Order from request data.

Explanation: The post entry point handles HTTP POST requests, receiving a context object with the request body (e.g., JSON payload). It’s used to create new records, returning the new record ID or details.

Deployment/Viewing Instructions:

Save as rest_post.js in the File Cabinet.
Deploy as a RESTlet (same as Lesson 1.1).
Test with Postman: POST <External URL> with a JSON body (e.g., {"customerId": "5", "itemId": "101", "quantity": "2"}), check the response.
Hands-On Coding Challenge:
Create a Sales Order with a customer and one item, return the new ID.
 */

define(['N/record'], function(record) {
    function post(context) {
        var salesOrder = record.create({
            type: record.Type.SALES_ORDER,
            isDynamic: true
        });
        salesOrder.setValue({ fieldId: 'entity', value: context.customerId });
        salesOrder.selectNewLine({ sublistId: 'item' });
        salesOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            value: context.itemId
        });
        salesOrder.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            value: context.quantity
        });
        salesOrder.commitLine({ sublistId: 'item' });
        var newId = salesOrder.save();
        return { id: newId, status: 'Sales Order created' };
    }
    return { post: post };
});