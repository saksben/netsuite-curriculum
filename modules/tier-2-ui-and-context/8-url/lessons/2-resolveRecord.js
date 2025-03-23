/**
 * Lesson 2.1: Linking to Records with resolveRecord
Objective: Use resolveRecord to create a URL for a specific Sales Order record.

Explanation: resolveRecord generates a URL to view or edit a record, accepting options like recordType, recordId, and isEditMode. This lesson creates a link to view a Sales Order, useful for navigation or email links.

Deployment/Viewing Instructions: Same as Lesson 1.1; open the Suitelet URL, check the Sales Order link, and verify the Execution Log.

Hands-On Coding Challenge:

Generate a view URL for Sales Order ID 1001.
 */

define(['N/url', 'N/log'], function(url, log) {
    function onRequest(scriptContext) {
        var recordUrl = url.resolveRecord({
            recordType: 'salesorder',
            recordId: '1001', // Replace with a valid ID
            isEditMode: false
        });
        log.debug({
            title: 'Record URL',
            details: 'Sales Order URL: ' + recordUrl
        });
        scriptContext.response.write('Sales Order View URL: <a href="' + recordUrl + '">SO 1001</a>');
    }
    return { onRequest: onRequest };
});