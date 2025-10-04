# MERN Backend Service

## Overview
This is the backend service for the MERN application. It handles authentication, API requests, and database operations.

## Prerequisites
- Node.js >= 18
- npm >= 9
- MongoDB Atlas or local MongoDB
- Kubernetes cluster (for deployment)
- Helm 3

## Setup
1. Clone the repository:
 ```bash
git clone <repo-url>
cd backend
```
## Install dependencies
```bash
npm install

```
## Configure environment variables:

Create Kubernetes secrets:
```bash
kubectl create secret generic backend-secrets \
  --from-literal=HASH_KEY=<hash_key> \
  --from-literal=JWT_SECRET_KEY=<jwt_secret>
```
- Optional environment variables can be added in values.yaml.

## Running Locally
```bash
npm start
```
# Deployment
1. Build Docker image:

    ```bash
    docker build -t mern-be:latest .
    ```
2. Apply Helm chart:
    ```bash
    helm install backend ./mern-chart --values values.yaml
    
    ```
3. Verify deployment:
    ```bash
    kubectl get pods
    kubectl logs <backend-pod>
    ```
# API Endpoints
    - /api/auth - Authentication endpoints
    - /api/users - User management



