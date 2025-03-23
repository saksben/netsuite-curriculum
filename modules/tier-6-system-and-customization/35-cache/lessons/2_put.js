/**
 * Lesson 2: Storing Data with put
Objective: Use Cache.put to store a key-value pair in the cache.

Explanation: put adds data to a Cache object, taking key (string), value (string, number, or JSON-serializable object), and optional ttl (time-to-live in seconds, default 3600). This stores temporary data for later retrieval, reducing processing overhead. Values are stored as strings internally, so objects are typically JSON-stringified.

Deployment/Viewing Instructions:

Save as cache2_put.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the stored data.
Hands-On Coding Challenge:
Store a Sales Order total in the cache with a 5-minute TTL.
 */

define(['N/cache', 'N/log', 'N/record'], function(cache, log, record) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var total = salesOrder.getValue('total');

        var myCache = cache.getCache({
            name: 'orderCache',
            scope: cache.Scope.PRIVATE
        });
        myCache.put({
            key: 'salesOrderTotal_' + salesOrderId,
            value: total,
            ttl: 300 // 5 minutes
        });
        log.debug({
            title: 'Data Cached',
            details: 'Key: salesOrderTotal_' + salesOrderId + ', Value: ' + total
        });
        scriptContext.response.write('Data cached. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});