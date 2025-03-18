/**
 * Lesson 2: Sending Data with post
Objective: Use https.post to send data to an external service.

Explanation: https.post sends a POST request to a url with a body (e.g., JSON string), returning a Response object. It’s used to create or update data on external systems, requiring a payload. Headers (e.g., Content-Type) can be set via the headers parameter. JSONPlaceholder echoes back POST data, making it a good test endpoint.

Deployment/Viewing Instructions:

Save as https2_post.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Access the External URL, then check the Execution Log for the posted data response.
Hands-On Coding Challenge:
Post a sample comment to JSONPlaceholder and log the response.
 */

define(['N/https', 'N/log'], function(https, log) {
    function onRequest(scriptContext) {
        var response = https.post({
            url: 'https://jsonplaceholder.typicode.com/comments',
            body: JSON.stringify({
                email: 'test@example.com',
                body: 'This is a test comment'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        log.debug({
            title: 'POST Response',
            details: 'Status Code: ' + response.code + ', Body: ' + response.body
        });
        scriptContext.response.write('Check the Execution Log for results.');
    }
    return {
        onRequest: onRequest
    };
});