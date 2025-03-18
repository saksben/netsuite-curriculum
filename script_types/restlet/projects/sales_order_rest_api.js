/**
 * Concluding Mini-Project: Sales Order REST API
Objective: Build a RESTlet using all entry points (get, post, put, delete) to provide a full CRUD API for Sales Orders.

Explanation: Integrates all four entry points to create a comprehensive RESTful API that allows retrieving, creating, updating, and deleting Sales Orders, simulating a real-world integration endpoint. Includes basic error handling for robustness.

Hands-On Coding Challenge:

Create a RESTlet to manage Sales Orders with all CRUD operations.

Deployment/Viewing Instructions:

Save as rest_sales_order_api.js in the File Cabinet.
Deploy as a RESTlet (same as Lesson 1.1), note the External URL.
Test with Postman or curl:
GET <URL>?id=1001 → Retrieve Sales Order details.
POST <URL> with {"customerId": "5", "itemId": "101", "quantity": "2"} → Create a new Sales Order.
PUT <URL> with {"id": "1001", "memo": "Updated via API"} → Update a Sales Order.
DELETE <URL>?id=1001 → Delete a Sales Order (if deletable).
Check responses for success or error messages.
Notes
Authentication: RESTlet calls require a NetSuite token or OAuth header (set up in Postman under Authorization).
Permissions: Ensure your role can create/update/delete Sales Orders; adjust to a custom record if needed.
Testing: Use valid IDs from your sandbox (e.g., customerId, itemId).
Next Steps: Add input validation, support for multiple line items, or integrate with N/search for bulk GET requests.
 */

define(['N/record', 'N/error'], function(record, error) {
    // Retrieve Sales Order details
    function get(context) {
        try {
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: context.id
            });
            return {
                id: context.id,
                total: salesOrder.getValue('total'),
                customer: salesOrder.getText('entity'),
                memo: salesOrder.getValue('memo'),
                status: 'Retrieved'
            };
        } catch (e) {
            throw error.create({
                name: 'INVALID_ID',
                message: 'Sales Order ID ' + context.id + ' not found: ' + e.message
            });
        }
    }

    // Create a new Sales Order
    function post(context) {
        try {
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
        } catch (e) {
            throw error.create({
                name: 'CREATE_FAILED',
                message: 'Failed to create Sales Order: ' + e.message
            });
        }
    }

    // Update an existing Sales Order
    function put(context) {
        try {
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: context.id
            });
            if (context.memo) {
                salesOrder.setValue({ fieldId: 'memo', value: context.memo });
            }
            if (context.customerId) {
                salesOrder.setValue({ fieldId: 'entity', value: context.customerId });
            }
            salesOrder.save();
            return {
                id: context.id,
                updatedMemo: salesOrder.getValue('memo'),
                updatedCustomer: salesOrder.getText('entity'),
                status: 'Sales Order updated'
            };
        } catch (e) {
            throw error.create({
                name: 'UPDATE_FAILED',
                message: 'Failed to update Sales Order ' + context.id + ': ' + e.message
            });
        }
    }

    // Delete a Sales Order
    function deleteFunc(context) {
        try {
            var salesOrderId = context.id;
            record.delete({
                type: record.Type.SALES_ORDER,
                id: salesOrderId
            });
            return { id: salesOrderId, status: 'Sales Order deleted' };
        } catch (e) {
            throw error.create({
                name: 'DELETE_FAILED',
                message: 'Failed to delete Sales Order ' + context.id + ': ' + e.message
            });
        }
    }

    return {
        get: get,
        post: post,
        put: put,
        'delete': deleteFunc
    };
});