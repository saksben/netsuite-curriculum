/**
 * Lesson 3: Retrieving Data with get
Objective: Use Cache.get to retrieve a cached value.

Explanation: get retrieves a value from the cache by key, with an optional loader function to compute the value if it’s missing or expired. Returns null if the key doesn’t exist and no loader is provided. This is key for reusing cached data efficiently.

Deployment/Viewing Instructions:

Save as cache3_get.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL after running Lesson 2, then check the Execution Log for the retrieved value.
Hands-On Coding Challenge:
Retrieve a cached Sales Order total, with a fallback loader.
 */

define(['N/cache', 'N/log', 'N/record'], function(cache, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Match Lesson 2’s Sales Order ID
        var myCache = cache.getCache({
            name: 'orderCache',
            scope: cache.Scope.PRIVATE
        });
        var cachedTotal = myCache.get({
            key: 'salesOrderTotal_' + salesOrderId,
            loader: function() {
                var salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId
                });
                return salesOrder.getValue('total');
            }
        });
        log.debug({
            title: 'Data Retrieved',
            details: 'Cached Total: ' + cachedTotal
        });
        scriptContext.response.write('Data retrieved. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});