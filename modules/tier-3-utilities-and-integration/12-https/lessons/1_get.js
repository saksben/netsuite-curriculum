/**
 * Lesson 1: Making a Simple GET Request with get
Objective: Learn to fetch data from an external URL using https.get.

Explanation: https.get sends a GET request to a specified url, returning a Response object with properties like body (response content) and code (HTTP status code, e.g., 200 for success). It’s the simplest way to retrieve data from an API or webpage, ideal for read-only operations. Use a public API (e.g., JSONPlaceholder) for testing in your sandbox.
Can use HTTPS to communicate between SuiteScript scripts, RESTlets, and SuiteTalk REST APIs without having to reauthenticate.

Deployment/Viewing Instructions:

Save the script file (e.g., https1_get.js) in the File Cabinet (Documents > Files > SuiteScripts).
Create a Suitelet Script record (Customization > Scripting > Scripts > New), set Script Type to Suitelet, and link your file.
Deploy it (Customization > Scripting > Script Deployments), set Status to Released, and note the External URL.
Open the URL in your browser, then check the Execution Log (Customization > Scripting > Script Deployments) for the response.
Hands-On Coding Challenge:
Fetch and log a sample post from JSONPlaceholder.
 */

define(['N/https', 'N/log'], function(https, log) {
    function onRequest(scriptContext) {
        var response = https.get({
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        });
        log.debug({
            title: 'GET Response',
            details: 'Status Code: ' + response.code + ', Body: ' + response.body
        });
        scriptContext.response.write('Check the Execution Log for results.');
    }
    return {
        onRequest: onRequest
    };
});