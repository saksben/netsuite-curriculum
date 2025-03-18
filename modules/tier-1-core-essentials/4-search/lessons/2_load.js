/**
 * Lesson 2: Loading and Modifying an Existing Saved Search with search.load
Objective: Use search.load to run and tweak a pre-existing saved search.

Explanation: search.load retrieves a saved search by its internal ID, letting you modify filters or columns before execution. This is efficient for reusing existing searches. Find saved search IDs in the NetSuite UI under Lists > Search > Saved Searches.

Hands-On Coding Challenge:

Load a saved Sales Order search and add a new filter.


Deployment/Viewing Instructions:

Save as search2_load.js.
Deploy as a User Event Script on Sales Order.
Load a Sales Order, then view the Execution Log for results. (Create a saved search in the UI first if needed: Transactions > Sales > Search, save it, and note its ID.)
 */

define(['N/search', 'N/log'], function(search, log) {
    function beforeLoad(scriptContext) {
        var savedSearch = search.load({
            id: 'customsearch_my_sales_orders' // Replace with a real saved search ID
        });
        savedSearch.filters.push(search.createFilter({
            name: 'total',
            operator: search.Operator.GREATERTHAN,
            values: 1000
        }));
        savedSearch.run().each(function(result) {
            log.debug('High-Value Order', 'Tran ID: ' + result.getValue('tranid'));
            return true;
        });
    }
    return {
        beforeLoad: beforeLoad
    };
});