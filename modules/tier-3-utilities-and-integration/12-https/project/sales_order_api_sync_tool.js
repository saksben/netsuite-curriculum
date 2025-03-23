/**
 * Concluding Mini-Project: Sales Order API Sync Tool
Objective: Build a Suitelet that uses all N/https sub-subjects (get, post, request, Method, code, body) to sync Sales Order data with an external API.

Explanation: This project integrates all N/https methods and properties to fetch, update, and post Sales Order-related data to JSONPlaceholder, simulating a real-world integration like syncing orders with an external CRM. It handles responses and statuses for robustness.

Hands-On Coding Challenge:

Create a Suitelet to fetch a post, update it, and post a new comment, logging all results.

Deployment/Viewing Instructions:

Save as https_mini_project.js in the File Cabinet.
Deploy as a Suitelet with Status: Released.
Open the External URL, then check the Execution Log for the full sync process (GET, PUT, POST responses).
Next Steps
Expand: Pair N/https with N/record to sync real Sales Order data to an API.
Challenge: Add retry logic for failed requests (e.g., if code isn’t 200).
Deep Dive: Explore https.request with other methods (e.g., DELETE) or add custom headers like authentication tokens.
 */

define(['N/https', 'N/log', 'N/record'], function(https, log, record) {
    function onRequest(scriptContext) {
        // Step 1: GET existing post
        var getResponse = https.get({
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        });
        var postData = JSON.parse(getResponse.body);
        log.debug({
            title: 'Fetched Post',
            details: 'Status: ' + getResponse.code + ', Title: ' + postData.title
        });

        // Step 2: PUT to update the post
        var updateResponse = https.request({
            method: https.Method.PUT,
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: JSON.stringify({
                id: 1,
                title: 'Sales Order Sync: ' + new Date().toISOString(),
                body: postData.body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var updatedData = JSON.parse(updateResponse.body);
        log.debug({
            title: 'Updated Post',
            details: 'Status: ' + updateResponse.code + ', New Title: ' + updatedData.title
        });

        // Step 3: POST a new comment if update succeeds
        if (updateResponse.code === 200 || updateResponse.code === 201) {
            var postResponse = https.post({
                url: 'https://jsonplaceholder.typicode.com/comments',
                body: JSON.stringify({
                    postId: 1,
                    email: 'sync@netsuite.com',
                    body: 'Synced Sales Order data successfully'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var commentData = JSON.parse(postResponse.body);
            log.debug({
                title: 'New Comment',
                details: 'Status: ' + postResponse.code + ', Comment ID: ' + commentData.id
            });
        } else {
            log.error({
                title: 'Sync Failed',
                details: 'Update failed with status: ' + updateResponse.code
            });
        }

        scriptContext.response.write('Check the Execution Log for sync results.');
    }
    return {
        onRequest: onRequest
    };
});