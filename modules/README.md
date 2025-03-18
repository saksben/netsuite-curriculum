# Order:
* Start with Debugging and Data: log, record, currentRecord, search give you immediate feedback and core data manipulation skills.
* Add UI and Context: dialog, message, serverWidget, runtime, recordContext enhance user interaction and script awareness.
* Expand to Utilities: file, https, http, email, format open up integration and formatting options.
* Master Advanced Tools: query, task, transaction, etc., tackle specialized tasks.
* Finish with Security/System: crypto, sftp, cache, etc., are for advanced or niche use cases.

This order progresses from foundational to advanced, aligning with your hands-on learning style. If you have specific goals (e.g., integrations or analytics), I can adjust the order! Let me know what’s next.

# Tier 1: Core Essentials (Start Here) 4
These are the most fundamental modules for interacting with NetSuite data and debugging, forming the backbone of most scripts.
1. * log
- Why First? Debugging is critical when learning. N/log lets you output info (debug, audit, error) to the Execution Log, helping you see what’s happening in your sandbox. It’s simple and universal across script types.
- Use Case: Logging variable values or script progress.
2. * record
- Why Next? Manipulating records (e.g., record.load, record.create) is a core SuiteScript skill. It’s used in most business logic (CRUD operations) and pairs well with logging for feedback.
- Use Case: Creating, updating, or deleting Sales Orders, Customers, etc.
3. * currentRecord
- Why Next? In Client Scripts, N/currentRecord gives you access to the record being viewed/edited in real-time. It’s intuitive after record and introduces client-side scripting.
- Use Case: Dynamically updating fields as users interact with a form.
4. * search
- Why Next? Querying data with search.create or search.lookupFields is essential for reporting, validation, or batch operations. It builds on record by letting you find records to manipulate.
- Use Case: Finding all open Sales Orders or looking up a customer’s email.

# Tier 2: UI and Context (Build on Core Skills) 5
These modules enhance user interaction and provide script context, common in real-world applications.
5. dialog
- Why Here? N/ui/dialog lets you create pop-ups (alerts, confirms), adding interactivity to scripts. It’s straightforward and pairs with currentRecord for client-side feedback.
- Use Case: Notifying users of validation errors.
6. message
- Why Next? N/ui/message displays banners or inline messages on forms, complementing dialog. It’s slightly more complex but still UI-focused.
- Use Case: Showing a success message after saving a record.
7. * serverWidget
- Why Next? N/ui/serverWidget lets you customize forms (add fields, buttons) or build Suitelets. It’s server-side UI control, useful after mastering client-side UI.
- Use Case: Adding a custom button to a Sales Order form.
8. * runtime
- Why Here? N/runtime provides context (e.g., user role, script parameters) and execution details. It’s practical for conditional logic once you’re comfortable with records and UI.
- Use Case: Checking the current user’s permissions before running logic.
9. * recordContext
- Why Next? N/recordContext gives additional context about a record’s state in Client Scripts (e.g., form mode). It’s niche but complements currentRecord and runtime.
- Use Case: Detecting if a record is in view or edit mode.

# Tier 3: Utilities and Integration (Expand Functionality) 6
These modules handle file operations, external connections, and formatting—common in more complex scripts.
10. * file
- Why Here? N/file manages File Cabinet operations (create, read files). It’s practical for logging results or importing data after mastering records and searches.
- Use Case: Saving search results to a CSV file.
11. * https
- Why Next? N/https makes external API calls, a natural progression for integrating NetSuite with outside systems.
- Use Case: Fetching weather data for a customer’s location.
12. http
- Why Next? Similar to https but includes additional HTTP methods (e.g., HEAD). Learn it alongside https for broader web integration.
- Use Case: Checking a URL’s status.
13. * email
- Why Here? N/email sends emails, a common automation task after mastering records and searches.
- Use Case: Emailing a customer when a Sales Order is created.
14. * format
- Why Next? N/format handles date, time, and number formatting, useful for displaying or processing data consistently.
- Use Case: Formatting a date for a report.
15. format/i18n
- Why Next? Extends format with internationalization (currency, locale). Learn it after format for global applications.
- Use Case: Displaying amounts in a customer’s local currency.

# Tier 4: Advanced Features (Specialized Tools) 8
These modules are for specific use cases or advanced scripting, building on earlier knowledge.
16. query
- Why Here? N/query offers an alternative to search with SQL-like syntax. Learn it after search for more complex queries.
- Use Case: Joining multiple record types in one query.
17. * task
- Why Next? N/task schedules scripts or tasks (e.g., Map/Reduce). It’s useful for automation after mastering basic scripting.
- Use Case: Scheduling a nightly data sync.
18. task/accounting/recognition
- Why Next? A niche extension of task for revenue recognition tasks. Learn it after task if relevant to your role.
- Use Case: Automating revenue schedules.
19. * transaction
- Why Here? N/transaction voids or reverses transactions, a specialized record operation.
- Use Case: Voiding an invoice programmatically.
20. currency
- Why Next? N/currency handles exchange rates and conversions, useful after format/i18n.
- Use Case: Converting a Sales Order total to USD.
21. encode
- Why Here? N/encode handles base64 or URL encoding, often used with files or APIs.
- Use Case: Encoding a file for an API payload.
22. xml
- Why Next? N/xml parses or generates XML, common in integrations after https.
- Use Case: Parsing an XML response from an API.
23. * render
- Why Here? N/render generates PDFs or emails with templates, useful for reporting after mastering UI and files.
- Use Case: Creating a custom invoice PDF.

# Tier 5: Security and Niche Utilities (Advanced/Optional) 10
These are for specific security, integration, or system-level tasks, often less frequently used.
24. crypto
- Why Here? N/crypto provides encryption (e.g., hashing). Learn it for security needs after integrations.
- Use Case: Hashing a password.
25. crypto/certificate
- Why Next? Extends crypto for certificate-based operations.
- Use Case: Signing a message with a certificate.
26. crypto/random
- Why Next? Generates random values, a niche crypto extension.
- Use Case: Creating a random token.
27. keyControl
- Why Here? Manages encryption keys, paired with crypto.
- Use Case: Storing a key for decryption.
28. certificateControl
- Why Next? Manages certificates, tied to crypto/certificate.
- Use Case: Importing a certificate.
29. https/clientCertificate
- Why Next? Adds client certificate authentication to https.
- Use Case: Authenticating to a secure API.
30. pgp
- Why Here? N/pgp handles PGP encryption, a niche security tool.
- Use Case: Encrypting sensitive data.
31. * auth
- Why Next? N/auth manages user authentication (e.g., password changes).
- Use Case: Forcing a password reset.
32. sso
- Why Here? N/sso handles single sign-on, a rare use case.
- Use Case: Generating an SSO token.
33. sftp
- Why Next? N/sftp manages SFTP file transfers, an advanced integration tool.
- Use Case: Uploading a file to an SFTP server.

# Tier 6: System and Customization (Highly Specialized) 17
These are for system-level scripting or custom app development, often the last to learn.
34. * cache
- Why Here? N/cache improves performance with caching, useful after mastering runtime and tasks.
- Use Case: Caching search results.
35. config
- Why Next? N/config accesses system settings, a niche utility.
- Use Case: Checking company preferences.
36. commerce
- Why Here? N/commerce is for SuiteCommerce-specific scripting.
- Use Case: Customizing a web store.
37. compress
- Why Next? N/compress handles file compression (e.g., gzip).
- Use Case: Compressing a large CSV.
38. * error
- Why Here? N/error creates custom errors, useful for advanced error handling.
- Use Case: Throwing a custom exception.
39. llm
- Why Next? N/llm (assuming Large Language Model) is experimental/new, likely for AI integration.
- Use Case: Generating text (if available in your version).
40. piRemoval
- Why Here? N/piRemoval removes personally identifiable info, a compliance tool.
- Use Case: Anonymizing customer data.
41. redirect
- Why Next? N/redirect handles navigation, common in Suitelets.
- Use Case: Redirecting to a record after submission.
42. suiteappinfo
- Why Here? N/suiteappinfo provides SuiteApp metadata, niche for app developers.
- Use Case: Checking SuiteApp version.
43. * util
- Why Next? N/util offers miscellaneous helpers (e.g., deep copying objects).
- Use Case: Cloning an object.
44. plugin
- Why Here? N/plugin manages custom plugins, advanced customization.
- Use Case: Loading a custom plugin.
45. portlet
- Why Next? N/portlet creates dashboard portlets, a UI niche.
- Use Case: Displaying a custom dashboard widget.
46. action
- Why Here? N/action executes bulk actions, advanced automation.
- Use Case: Mass-updating records.
47. scriptTypes/restlet
- Why Next? N/scriptTypes/restlet is for RESTlet-specific scripting, a specific script type.
- Use Case: Building a REST API endpoint.
48. * workflow
- Why Here? N/workflow interacts with workflows, often last as it’s workflow-dependent.
- Use Case: Triggering a workflow step.
49. translation
- Why Next? N/translation handles multi-language support, niche for global apps.
- Use Case: Translating UI text.
50. workbook
- Why Here? N/workbook creates analytics workbooks, analytics-focused.
- Use Case: Building a custom report.
51. dataset
- Why Last? N/dataset defines datasets for workbooks, paired with workbook.
- Use Case: Feeding data to a workbook.