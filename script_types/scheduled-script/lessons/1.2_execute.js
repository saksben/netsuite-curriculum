/**
 * Lesson 1.2: Managing Governance with execute and Rescheduling
Objective: Use execute with N/task to process Sales Orders while handling governance limits by rescheduling.

Explanation: Scheduled Scripts have governance limits (e.g., 10,000 units), and execute can exceed these with large datasets. This lesson introduces rescheduling using N/task to queue another execution when limits are neared, tracked via scriptContext’s getRemainingUsage. It builds on Lesson 1.1 by adding scalability.

Deployment/Viewing Instructions:

Save as ss_execute_reschedule.js in the File Cabinet.
Deploy as a Scheduled Script (same as Lesson 1.1).
Schedule or execute manually, then check the Execution Log and Script Queue (Setup > Scripting > Script Status) for rescheduling evidence.
Hands-On Coding Challenge:
Update Sales Order memos and reschedule if usage drops below 1000 units.
 */

define(['N/search', 'N/record', 'N/task', 'N/log'], function(search, record, task, log) {
    function execute(scriptContext) {
        var soSearch = search.create({
            type: 'salesorder',
            filters: [['mainline', 'is', 'T']],
            columns: ['internalid']
        });
        var count = 0;
        soSearch.run().each(function(result) {
            var soId = result.getValue('internalid');
            var salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: soId
            });
            salesOrder.setValue({
                fieldId: 'memo',
                value: 'Processed on ' + new Date().toISOString()
            });
            salesOrder.save();
            count++;

            // Check governance and reschedule if needed
            if (scriptContext.getRemainingUsage() < 1000 && count < 100) {
                var taskObj = task.create({
                    taskType: task.TaskType.SCHEDULED_SCRIPT,
                    scriptId: scriptContext.scriptId, // Replace with your script ID if hardcoded
                    deploymentId: scriptContext.deploymentId
                });
                taskObj.submit();
                log.debug({
                    title: 'Rescheduled',
                    details: 'Processed ' + count + ' records, rescheduling due to low usage'
                });
                return false; // Stop current execution
            }
            return true; // Continue processing
        });
        log.debug({
            title: 'Execution Complete',
            details: 'Processed ' + count + ' Sales Orders'
        });
    }
    return { execute: execute };
});