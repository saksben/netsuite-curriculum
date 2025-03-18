/**
 * Lesson 3: Flexible Requests with request
Objective: Use https.request to make a custom HTTP request with any method.

Explanation: https.request is a versatile method that supports any HTTP method (e.g., https.Method.GET, POST, PUT) via the Method enum. It takes url, method, body, and headers, returning a Response object. This offers more control than get or post, useful for complex APIs.

Deployment/Viewing Instructions:

Save as https3_request.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the response.
Hands-On Coding Challenge:
Make a PUT request to update a post on JSONPlaceholder.
 */

define(['N/https', 'N/log'], function(https, log) {
    function onRequest(scriptContext) {
        var response = https.request({
            method: https.Method.PUT,
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: JSON.stringify({
                title: 'Updated Title',
                body: 'Updated content'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        log.debug({
            title: 'PUT Response',
            details: 'Status Code: ' + response.code + ', Body: ' + response.body
        });
        scriptContext.response.write('Check the Execution Log for results.');
    }
    return {
        onRequest: onRequest
    };
});