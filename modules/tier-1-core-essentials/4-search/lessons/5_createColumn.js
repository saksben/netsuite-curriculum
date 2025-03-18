/**
 * Lesson 5: Defining Columns with search.createColumn
Objective: Customize search results with specific columns.

Explanation: search.createColumn defines columns with options like sorting, summary types (e.g., SUM, COUNT), or joins to related records (e.g., customer). This controls the data returned in results, enhancing flexibility.

Hands-On Coding Challenge:

Search for Sales Orders with a sorted total and customer name.


Deployment/Viewing Instructions:

Save as search5_columns.js.
Deploy to Sales Order.
Load a Sales Order and check the Execution Log for sorted results.
 */

define(['N/search', 'N/log'], function(search, log) {
    function beforeLoad(scriptContext) {
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [],
            columns: [
                search.createColumn({ name: 'tranid' }),
                search.createColumn({ name: 'total', sort: search.Sort.DESC }),
                search.createColumn({ name: 'entityid', join: 'customer' })
            ]
        });
        salesOrderSearch.run().each(function(result) {
            log.debug('Sorted Order', 'Tran ID: ' + result.getValue('tranid') + 
                     ', Total: ' + result.getValue('total'));
            return true;
        });
    }
    return {
        beforeLoad: beforeLoad
    };
});