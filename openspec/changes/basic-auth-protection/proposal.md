## Why

The application is being published to the internet and should not be exposed publicly without some form of access control. Adding basic authentication at the backend layer will help protect the instance while keeping the implementation simple and operationally lightweight.

## What Changes

- Add support for basic authentication on the backend service.
- Allow access credentials to be configured from a file mounted into the container at runtime.
- Keep the deployment model simple for self-hosted and Docker-based environments.

## Capabilities

### New Capabilities
- basic-auth-protection: protect the deployed application with configured username/password authentication.

### Modified Capabilities
- None.

## Impact

- Public access to the application will require authentication.
- Deployment configuration will include a mounted credentials file.
- The backend service will validate credentials before allowing access to app routes.
