/**
 * Lesson 4.1: Summarizing Results with summarize
Objective: Use summarize to log a summary of the Map/Reduce process.

Explanation: The summarize stage runs after all map and reduce tasks, receiving summary with execution metrics (e.g., inputSummary, mapSummary, reduceSummary). It’s ideal for logging or reporting results. This lesson logs the number of processed records.

Deployment/Viewing Instructions: Same as Lesson 1.1; run and check the Execution Log for summary details.

Hands-On Coding Challenge:

Log the total number of processed Sales Orders.
 */

define(['N/log'], function(log) {
    function summarize(summary) {
        var inputCount = summary.inputSummary.recordsProcessed || 0;
        var mapCount = summary.mapSummary.keysProcessed || 0;
        var reduceCount = summary.reduceSummary.keysProcessed || 0;
        log.audit({
            title: 'Map/Reduce Summary',
            details: 'Input Records: ' + inputCount + 
                     ', Mapped: ' + mapCount + 
                     ', Reduced: ' + reduceCount
        });
    }
    return { summarize: summarize };
});