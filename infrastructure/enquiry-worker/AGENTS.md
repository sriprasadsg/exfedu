# Enquiry service architecture
- This is an independently deployed enquiry API, not website hosting infrastructure; preserve the frontend envelope so all four existing forms share one endpoint.
- Validate every form server-side, fix the recipient in code, and send plain text through the server-only Resend adapter; return success only with a provider acceptance ID, never an inbox-delivery claim.
- Keep Worker secrets out of frontend configuration, responses and logs; CORS is an origin restriction, not authentication or bot protection.