/**
 * Lesson 4: Using Filters with search.createFilter
Objective: Build complex searches with dynamic filters.

Explanation: search.createFilter creates filter objects for use in search.create or search.load. Filters specify field names, operators (e.g., is, greaterthan), and values. Multiple filters can be combined for precise results.

Hands-On Coding Challenge:

Search for Sales Orders from the last 30 days with a total over 500.


Deployment/Viewing Instructions:

Save as search4_filters.js.
Deploy to Sales Order.
Save a Sales Order and check the Execution Log for matching records.
 */

define(['N/search', 'N/log'], function(search, log) {
    function afterSubmit(scriptContext) {
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                search.createFilter({
                    name: 'trandate',
                    operator: search.Operator.ONORAFTER,
                    values: thirtyDaysAgo
                }),
                search.createFilter({
                    name: 'total',
                    operator: search.Operator.GREATERTHAN,
                    values: 500
                })
            ],
            columns: ['tranid', 'trandate', 'total']
        });
        salesOrderSearch.run().each(function(result) {
            log.debug('Recent Order', 'Tran ID: ' + result.getValue('tranid'));
            return true;
        });
    }
    return {
        afterSubmit: afterSubmit
    };
});