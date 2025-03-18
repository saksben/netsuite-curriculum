/**
 * Lesson 1.1: Defining Input with getInputData
Objective: Use getInputData to retrieve a set of Sales Orders for processing.

Explanation: The getInputData entry point is the first stage, defining the dataset to process. It returns an array, search object, or iterator, which is then split across map tasks. This lesson uses a search to fetch Sales Orders.

Deployment/Viewing Instructions:

Save as mr_getinput.js in the File Cabinet (Documents > Files > SuiteScripts).
Create a Map/Reduce Script (Customization > Scripting > Scripts > New), set Script Type to Map/Reduce, link the file, and deploy (Status: Released).
Execute manually (Customization > Scripting > Script Deployments > Edit > Execute Now), then check the Execution Log or script status (Setup > Scripting > Map/Reduce Script Status).
Hands-On Coding Challenge:
Return a search for Sales Orders with totals over $1000.
 */

define(['N/search'], function(search) {
    function getInputData(scriptContext) {
        return search.create({
            type: 'salesorder',
            filters: [
                ['mainline', 'is', 'T'],
                'AND',
                ['total', 'greaterthan', 1000]
            ],
            columns: ['internalid', 'total', 'entity']
        });
    }
    return { getInputData: getInputData };
});