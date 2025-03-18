/**
 * Lesson 3: Scheduling a CSV Import with TaskType.CSV_IMPORT
Objective: Create a CSV Import task using task.create with TaskType.CSV_IMPORT.

Explanation: task.TaskType.CSV_IMPORT schedules a CSV import task, requiring fileId (from an N/file object) and importId (a Saved CSV Import ID from Setup > Import/Export > Saved CSV Imports). This automates data imports, like uploading Sales Orders from a file.

Deployment/Viewing Instructions:

Save as task3_csvimport.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check CSV Import Status (Setup > Import/Export > Import CSV Records > Status) and the Execution Log.
Hands-On Coding Challenge:
Schedule a CSV import task with a sample file.
 */

define(['N/task', 'N/file', 'N/log'], function(task, file, log) {
    function onRequest(scriptContext) {
        var csvFile = file.create({
            name: 'sample_import.csv',
            fileType: file.Type.CSV,
            contents: 'custid,name\n1,Test Customer',
            folder: -15 // SuiteScripts folder
        });
        var fileId = csvFile.save();

        var csvTask = task.create({
            taskType: task.TaskType.CSV_IMPORT,
            fileId: fileId,
            importId: 789 // Replace with a valid Saved CSV Import ID
        });
        var taskId = csvTask.submit();
        log.debug({
            title: 'CSV Import Task Submitted',
            details: 'Task ID: ' + taskId
        });
        scriptContext.response.write('CSV Import task submitted. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});