/**
 * Lesson 5: Processing Response Data with body
Objective: Extract and use data from the body property of a response.

Explanation: The body property of a Response object contains the raw response content (e.g., JSON, HTML). For JSON APIs, you can parse it with JSON.parse to work with the data programmatically. This is key for integrating external data into NetSuite.

Deployment/Viewing Instructions:

Save as https5_body.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the parsed data.
Hands-On Coding Challenge:
Fetch a post, parse its JSON body, and log the title.
 */

define(['N/https', 'N/log'], function(https, log) {
    function onRequest(scriptContext) {
        var response = https.get({
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        });
        var data = JSON.parse(response.body);
        log.debug({
            title: 'Parsed Response',
            details: 'Post Title: ' + data.title
        });
        scriptContext.response.write('Check the Execution Log for results.');
    }
    return {
        onRequest: onRequest
    };
});