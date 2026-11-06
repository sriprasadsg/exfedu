# Enquiry service architecture
- This is an independently deployed enquiry API, not website hosting infrastructure; preserve the frontend envelope so all four existing forms share one endpoint.
- Validate every form server-side and send plain text through the server-only Microsoft Graph client-credentials adapter; success requires HTTP 202 plus Microsoft's request-id, which is acceptance correlation, not a message ID or inbox-delivery proof.
- Keep the configured sender on the approved domain and Microsoft application permissions scoped to that mailbox; Graph has no sendMail idempotency guarantee, so never automatically retry an ambiguous send.
- Keep Worker secrets out of frontend configuration, responses and logs; CORS is an origin restriction, not authentication or bot protection.