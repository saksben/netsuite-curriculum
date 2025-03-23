/**
 * Lesson 4: Handling Response Codes with code
Objective: Use the code property to check HTTP status codes.

Explanation: The code property on a Response object indicates the HTTP status (e.g., 200 for OK, 404 for Not Found). This is critical for error handling or validating successful requests, allowing scripts to react to different outcomes.

Deployment/Viewing Instructions:

Save as https4_code.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Access the External URL, then check the Execution Log for the status check.
Hands-On Coding Challenge:
Fetch a nonexistent resource and log the status code.
 */

define(['N/https', 'N/log'], function(https, log) {
    function onRequest(scriptContext) {
        var response = https.get({
            url: 'https://jsonplaceholder.typicode.com/nonexistent'
        });
        var message = response.code === 404 
            ? 'Resource not found (404)' 
            : 'Unexpected status: ' + response.code;
        log.debug({
            title: 'Status Check',
            details: message
        });
        scriptContext.response.write('Check the Execution Log for results.');
    }
    return {
        onRequest: onRequest
    };
});