## 1. Backend Authentication

- [x] 1.1 Add basic-auth middleware that reads credentials from a configuration file
- [x] 1.2 Support environment-based configuration for the auth file path
- [x] 1.3 Protect the main application routes and API endpoints with the middleware

## 2. Container / Deployment

- [x] 2.1 Update Docker configuration to mount a credentials file directory into the backend container
- [x] 2.2 Document how to create and mount the auth config file for deployed instances

## 3. Verification

- [x] 3.1 Verify the app requires authentication when credentials are configured
- [x] 3.2 Verify the app remains accessible in local development without auth unless configured
