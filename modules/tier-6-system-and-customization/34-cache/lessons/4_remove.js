/**
 * Lesson 4: Removing Data with remove
Objective: Use Cache.remove to delete a key-value pair from the cache.

Explanation: remove deletes a specific key from the cache, freeing up space or invalidating outdated data. This is useful for cleanup or when cached data becomes irrelevant (e.g., after a record update). It silently succeeds if the key doesn’t exist.

Deployment/Viewing Instructions:

Save as cache4_remove.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL after running Lesson 2 or 3, then check the Execution Log and re-run Lesson 3 to confirm removal.
Hands-On Coding Challenge:
Remove a cached Sales Order total and verify it’s gone.
 */

define(['N/cache', 'N/log'], function(cache, log) {
    function onRequest(scriptContext) {
        var salesOrderId = 1001; // Match previous lessons
        var myCache = cache.getCache({
            name: 'orderCache',
            scope: cache.Scope.PRIVATE
        });
        myCache.remove({
            key: 'salesOrderTotal_' + salesOrderId
        });
        var afterRemove = myCache.get({
            key: 'salesOrderTotal_' + salesOrderId
        });
        log.debug({
            title: 'Data Removed',
            details: 'Value after removal: ' + (afterRemove === null ? 'null' : afterRemove)
        });
        scriptContext.response.write('Data removed. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});