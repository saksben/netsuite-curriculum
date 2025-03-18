/**
 * Lesson 1: Creating a Basic Search with search.create
Objective: Learn to create and run a simple search to retrieve records.

Explanation: The N/search module’s search.create method lets you define a search with a type, filters, and columns. It’s useful for querying records dynamically. Results are returned as a ResultSet you can iterate over using run().each. You’ll need the N/search module and a basic understanding of NetSuite record types.

Hands-On Coding Challenge:

Create a User Event Script to search for all Sales Orders with a specific status.


Deployment/Viewing Instructions:

Save as search1_create.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a User Event Script record, link the file, and deploy to Sales Order with Status: Testing.
Save a Sales Order in your sandbox, then check the Execution Log (Customization > Scripting > Script Deployments) for the results.
 */

define(['N/search', 'N/log'], function(search, log) {
    function afterSubmit(scriptContext) {
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['status', 'is', 'SalesOrd:B'] // Pending Fulfillment
            ],
            columns: ['tranid', 'entity', 'total']
        });
        salesOrderSearch.run().each(function(result) {
            log.debug('Sales Order Found', 'Tran ID: ' + result.getValue('tranid') + 
                     ', Customer: ' + result.getText('entity') + 
                     ', Total: ' + result.getValue('total'));
            return true; // Continue iteration
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});