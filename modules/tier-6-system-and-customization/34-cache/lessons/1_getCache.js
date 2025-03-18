/**
 * Lesson 1: Creating and Accessing a Cache with getCache
Objective: Learn to create or retrieve a cache using cache.getCache.

Explanation: cache.getCache creates or retrieves a Cache object with a unique name (string identifier) and optional scope (from cache.Scope, e.g., PRIVATE, PUBLIC). The cache stores key-value pairs for quick access, persisting based on scope (e.g., PRIVATE for the current user/script, PUBLIC across users). This is the entry point for caching operations.

Deployment/Viewing Instructions:

Save the script file (e.g., cache1_getcache.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL multiple times, then check the Execution Log for cache initialization details.
Hands-On Coding Challenge:
Create a private cache and log its creation.
 */

define(['N/cache', 'N/log'], function(cache, log) {
    function onRequest(scriptContext) {
        var myCache = cache.getCache({
            name: 'myPrivateCache',
            scope: cache.Scope.PRIVATE
        });
        log.debug({
            title: 'Cache Initialized',
            details: 'Cache Name: ' + myCache.name + ', Scope: ' + myCache.scope
        });
        scriptContext.response.write('Cache created. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});