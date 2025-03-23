/**
 * Lesson 3: Merging Objects with extend
Objective: Use util.extend to combine two objects into one.

Explanation: util.extend merges properties from a source object into a target object, overwriting target properties if they exist in source. This is handy for combining default settings with user overrides or aggregating data. It modifies the target in place and returns it.

Deployment/Viewing Instructions:

Save as util3_extend.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the merged object.
Hands-On Coding Challenge:
Merge default and custom Sales Order settings into one object.
 */

define(['N/util', 'N/log'], function(util, log) {
    function onRequest(scriptContext) {
        var defaultSettings = {
            priority: 'Medium',
            notify: false
        };
        var customSettings = {
            priority: 'High',
            assignee: 'John Doe'
        };

        var mergedSettings = util.extend(defaultSettings, customSettings);
        log.debug({
            title: 'Merged Settings',
            details: 'Merged: ' + JSON.stringify(mergedSettings)
        });
        scriptContext.response.write('Settings merged. Check logs.');
    }
    return {
        onRequest: onRequest
    };
});