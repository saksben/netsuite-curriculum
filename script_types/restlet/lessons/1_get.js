/**
 * Lesson 1.1: Retrieving Data with get
Objective: Use get to return Sales Order data based on a request parameter.

Explanation: The get entry point handles HTTP GET requests, receiving a context object with query parameters. It’s used to retrieve data, such as fetching a Sales Order by ID. The response is typically a JSON object.

Deployment/Viewing Instructions:

Save as rest_get.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a RESTlet Script (Customization > Scripting > Scripts > New), set Script Type to RESTlet, link the file, and deploy (Status: Released).
Note the External URL from the deployment (Customization > Scripting > Script Deployments).
Test using a tool like Postman or curl: GET <External URL>?id=1001 (replace with your URL and a valid Sales Order ID), check the response.
Hands-On Coding Challenge:
Return a Sales Order’s total and customer for a given ID.
 */

define(['N/record'], function(record) {
    function get(context) {
        var salesOrderId = context.id;
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        return {
            id: salesOrderId,
            total: salesOrder.getValue('total'),
            customer: salesOrder.getText('entity')
        };
    }
    return { get: get };
});