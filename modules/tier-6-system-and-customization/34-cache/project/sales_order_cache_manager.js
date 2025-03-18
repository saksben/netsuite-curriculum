/**
 * Concluding Mini-Project: Sales Order Cache Manager
Objective: Build a Suitelet that uses all N/cache sub-subjects (getCache, get, put, remove, Scope) to manage Sales Order data caching.

Explanation: This project integrates all N/cache methods and options to create a caching system for Sales Order totals: storing them with put, retrieving with get, removing outdated entries with remove, and using a PUBLIC scope for shared access. It simulates a real-world use case like optimizing performance in a multi-user environment.

Hands-On Coding Challenge:

Create a Suitelet to cache, retrieve, and remove Sales Order totals with a form interface.

Deployment/Viewing Instructions:

Save as cache_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the form for cached, retrieved, and removed values, and the Execution Log for detailed steps. Re-run to test cache persistence with PUBLIC scope.
Next Steps
Expand: Pair N/cache with N/https to cache API responses.
Challenge: Add a button to refresh the cache manually via the form.
Deep Dive: Explore cache size limits or test Scope.PROTECTED for role-based access.
 */

define(['N/cache', 'N/log', 'N/record', 'N/ui/serverWidget'], function(cache, log, record, serverWidget) {
    function onRequest(scriptContext) {
        var form = serverWidget.createForm({ title: 'Sales Order Cache Manager' });
        var salesOrderId = 1001; // Replace with a valid Sales Order ID
        var cacheName = 'sharedOrderCache';
        var cacheKey = 'salesOrderTotal_' + salesOrderId;

        // Get or create a public cache
        var sharedCache = cache.getCache({
            name: cacheName,
            scope: cache.Scope.PUBLIC
        });

        // Step 1: Put data into cache
        var salesOrder = record.load({
            type: record.Type.SALES_ORDER,
            id: salesOrderId
        });
        var total = salesOrder.getValue('total');
        sharedCache.put({
            key: cacheKey,
            value: JSON.stringify({ total: total, timestamp: new Date().toISOString() }),
            ttl: 600 // 10 minutes
        });
        log.debug({
            title: 'Cached Data',
            details: 'Key: ' + cacheKey + ', Value: ' + total
        });
        form.addField({
            id: 'custpage_cached',
            type: serverWidget.FieldType.TEXT,
            label: 'Cached Total'
        }).defaultValue = total.toString();

        // Step 2: Get data from cache
        var cachedData = sharedCache.get({
            key: cacheKey,
            loader: function() {
                return JSON.stringify({ total: total, timestamp: new Date().toISOString() });
            }
        });
        var parsedData = JSON.parse(cachedData);
        log.debug({
            title: 'Retrieved Data',
            details: 'Total: ' + parsedData.total + ', Timestamp: ' + parsedData.timestamp
        });
        form.addField({
            id: 'custpage_retrieved',
            type: serverWidget.FieldType.TEXT,
            label: 'Retrieved Total'
        }).defaultValue = parsedData.total;

        // Step 3: Remove data from cache
        sharedCache.remove({ key: cacheKey });
        var afterRemove = sharedCache.get({ key: cacheKey });
        log.debug({
            title: 'Data After Removal',
            details: 'Value: ' + (afterRemove === null ? 'null' : afterRemove)
        });
        form.addField({
            id: 'custpage_removed',
            type: serverWidget.FieldType.TEXT,
            label: 'After Removal'
        }).defaultValue = afterRemove === null ? 'Removed' : 'Still Present';

        scriptContext.response.writePage(form);
    }
    return {
        onRequest: onRequest
    };
});