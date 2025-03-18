/**
 * Lesson 7: Running Global Searches with search.global
Objective: Perform a keyword-based global search across records.

Explanation: search.global searches all searchable records for keywords, returning basic result data (e.g., record type, ID). It’s less structured but ideal for broad, exploratory lookups across the system.

Hands-On Coding Challenge:

Search for the keyword “Test” globally.


Deployment/Viewing Instructions:

Save as search7_global.js.
Deploy to Sales Order.
Load a Sales Order and check the Execution Log for matches.
 */

define(['N/search', 'N/log'], function(search, log) {
    function beforeLoad(scriptContext) {
        var globalResults = search.global({
            keywords: 'Test'
        });
        globalResults.forEach(function(result) {
            log.debug('Global Hit', 'Record Type: ' + result.recordType + 
                     ', ID: ' + result.id);
        });
    }
    return {
        beforeLoad: beforeLoad
    };
});