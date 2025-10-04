## 1 Challenge: Environment variables not properly set in backend-deployment.yaml.

Issue: Secret keys (HASH_KEY, JWT_SECRET_KEY) and other environment variables needed for backend were not picked up correctly.

Solution: Used secretKeyRef for sensitive keys.

Used .Values.backend.env loop in Helm to inject custom environment variables dynamically.

Screenshot Suggestion:

Kubernetes deployment YAML showing environment variables injected from secrets.

kubectl describe pod <backend-pod> showing the environment variables applied.

## 2.Challenge: Dynamic configuration for Helm values not working.

Issue: .Values.backend.env block required templating to inject additional environment variables.

Solution: Correctly used Helm templating syntax:
```
{{- range .Values.backend.env }}
- name: {{ .name }}
  value: "{{ .value }}"
{{- end }}
```
## Challenge: Kubernetes deployment failing due to missing secrets or incorrect references.

Issue: The pod wouldn’t start without proper secret references.

Solution: Created backend-secrets in Kubernetes using kubectl create secret generic backend-secrets.

## Challenge: Kubernetes deployment failing due to missing secrets or incorrect references.

Issue: The pod wouldn’t start without proper secret references.

Solution: Created backend-secrets in Kubernetes using kubectl create secret generic backend-secrets ....


## Challenge: Proper integration between frontend and backend with Helm charts.

Issue: Backend service URL needed to be passed to frontend for API calls.

Solution:

Configured frontend environment variables in values.yaml.

Exposed backend service via Kubernetes Service and used it in frontend config.


## Challenge: Validation of the full deployment in Kubernetes.

Issue: Needed proof that the application (frontend + backend) is running properly.

Solution:

Verified pods, services, and ingress resources.

Used kubectl get pods, kubectl get svc, and logs to ensure correct deployment.