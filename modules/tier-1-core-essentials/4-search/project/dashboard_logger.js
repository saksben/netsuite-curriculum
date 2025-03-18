/**
 * Concluding Mini-Project: Sales Order Dashboard Logger
Objective: Build a script that combines all N/search sub-subjects to log a dashboard-style summary of Sales Order data.

Explanation: This project integrates search.create, search.load, search.lookupFields, search.createFilter, search.createColumn, run().getRange, and search.global to analyze Sales Orders and related data, simulating a real-world use case like a custom report or audit tool.

Hands-On Coding Challenge:

Create a User Event Script that logs a summary of recent high-value Sales Orders, including customer details and a global search check.


Deployment/Viewing Instructions:

Save as search_mini_project.js.
Deploy as a User Event Script on Sales Order with Status: Testing.
Ensure you have a saved search (customsearch_my_sales_orders) or replace with a valid ID.
Save a Sales Order, then check the Execution Log for the detailed summary.
Next Steps
Expand: Add N/record to update records based on search results.
Challenge: Turn this into a Suitelet with a custom UI displaying the dashboard.
Deep Dive: Explore summary columns (e.g., search.createColumn({ name: 'total', summary: search.Summary.SUM })).
 */

define(['N/search', 'N/log'], function(search, log) {
    function afterSubmit(scriptContext) {
        // Step 1: Load a saved search and modify it
        var savedSearch = search.load({
            id: 'customsearch_my_sales_orders' // Replace with your saved search ID
        });
        savedSearch.filters.push(search.createFilter({
            name: 'total',
            operator: search.Operator.GREATERTHAN,
            values: 1000
        }));

        // Step 2: Create a new search with custom filters and columns
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        var newSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                search.createFilter({
                    name: 'trandate',
                    operator: search.Operator.ONORAFTER,
                    values: thirtyDaysAgo
                }),
                search.createFilter({
                    name: 'status',
                    operator: search.Operator.ANYOF,
                    values: ['SalesOrd:B', 'SalesOrd:D'] // Pending Fulfillment or Billed
                })
            ],
            columns: [
                search.createColumn({ name: 'tranid' }),
                search.createColumn({ name: 'total', sort: search.Sort.DESC }),
                search.createColumn({ name: 'entityid', join: 'customer' })
            ]
        });

        // Step 3: Get paged results from the new search
        var recentOrders = newSearch.run().getRange({
            start: 0,
            end: 3
        });

        // Step 4: Log dashboard summary
        var summary = 'Sales Order Dashboard:\n';
        summary += 'Top 3 Recent Orders:\n';
        recentOrders.forEach(function(result, index) {
            var customerId = result.getValue({ name: 'entity', join: 'customer' });
            var customerData = search.lookupFields({
                type: search.Type.CUSTOMER,
                id: customerId,
                columns: ['email']
            });
            summary += `${index + 1}. Tran ID: ${result.getValue('tranid')}, ` +
                       `Total: ${result.getValue('total')}, ` +
                       `Customer: ${result.getValue({ name: 'entityid', join: 'customer' })}, ` +
                       `Email: ${customerData.email}\n`;
        });

        // Step 5: Add global search for context
        var globalResults = search.global({ keywords: 'High Value' });
        summary += 'Global "High Value" Matches: ' + globalResults.length + '\n';

        log.debug('Dashboard Summary', summary);
    }
    return {
        afterSubmit: afterSubmit
    };
});