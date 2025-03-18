/**
 * Lesson 1.1: Batch Processing with execute
Objective: Use execute to process a batch of Sales Orders and log their details.

Explanation: The execute entry point is the core of a Scheduled Script, running when the script is scheduled or triggered via N/task. It receives a scriptContext object with deployment details and is suited for processing large datasets, such as updating or auditing records. This lesson focuses on basic batch processing using a search.

Deployment/Viewing Instructions:

Save as ss_execute_basic.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Scheduled Script (Customization > Scripting > Scripts > New), set Script Type to Scheduled Script, link the file, and deploy (Status: Released).
Schedule it (Setup > Scripting > Schedule) or execute manually (Execute Now from the deployment), then check the Execution Log (Customization > Scripting > Script Deployments > View > Execution Log).
Hands-On Coding Challenge:
Log the IDs and totals of Sales Orders with totals over $1000.
 */

define(['N/search', 'N/log'], function(search, log) {
    function execute(scriptContext) {
        var soSearch = search.create({
            type: 'salesorder',
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['total', 'greaterthan', 1000]
            ],
            columns: ['internalid', 'total']
        });
        soSearch.run().each(function(result) {
            log.debug({
                title: 'High-Value Sales Order',
                details: 'ID: ' + result.getValue('internalid') + ', Total: ' + result.getValue('total')
            });
            return true; // Continue processing
        });
    }
    return { execute: execute };
});