/**
 * Lesson 6: Paginating Results with run().getRange
Objective: Handle large result sets by fetching specific ranges.

Explanation: search.run().getRange retrieves a subset of results (e.g., 10 at a time) using start and end indexes. It’s useful for performance optimization or paginated displays, avoiding full iteration.

Hands-On Coding Challenge:

Get the first 5 Sales Orders.


Deployment/Viewing Instructions:

Save as search6_range.js.
Deploy to Sales Order.
Save a Sales Order and check the Execution Log for the first 5 results.
 */

define(['N/search', 'N/log'], function(search, log) {
    function afterSubmit(scriptContext) {
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [],
            columns: ['tranid', 'total']
        });
        var results = salesOrderSearch.run().getRange({
            start: 0,
            end: 5
        });
        results.forEach(function(result) {
            log.debug('Paged Result', 'Tran ID: ' + result.getValue('tranid'));
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});