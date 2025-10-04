# MERN Application Deployment using Kubernetes & Helm

## Overview
This is a MERN (MongoDB, Express.js, React.js, Node.js) full-stack application deployed using Docker, Kubernetes, and Helm charts.  
The backend handles API requests and authentication, while the frontend provides a user interface for interacting with the application.  

The deployment includes:  
- **Backend Service**: Node.js + Express.js, connected to MongoDB  
- **Frontend Service**: React.js app consuming backend APIs  
- **Kubernetes Deployment**: Pods, Services, Secrets, ConfigMaps, and Helm templating  

---

## Working Diagram

```
      +------------------+
      |   User / Browser |
      +--------+---------+
               |
               v
       +-------+--------+
       |  Frontend Pod  |
       | React.js App   |
       +-------+--------+
               |
               v
       +-------+--------+
       |  Backend Pod   |
       | Node.js + API  |
       +-------+--------+
               |
               v
       +-------+--------+
       |   MongoDB DB   |
       +----------------+

```


- Users interact with the **frontend** via browser.  
- Frontend communicates with the **backend API**.  
- Backend handles data storage and retrieval in **MongoDB**.

---

## File Structure & References

- **Frontend**: [learnerReportCS](Frontend)  
- **Backend **: [learnerReportCS](Backend)  
- **Screenshots Folder**: [screenshots](Screenshots/)  

---

## How to Run

1. Make sure you have:
   - Node.js & npm
   - Docker
   - Kubernetes cluster
   - Helm 3

2. Follow individual README files for:
   - [Backend Setup](backend/README.md)  
   - [Frontend Setup](frontend/README.md)  

3. Verify deployment in Kubernetes:
```bash
kubectl get pods
kubectl get svc
```
4. Access the frontend through Service/Ingress URL.

Check backend logs for API connectivity and database operations



