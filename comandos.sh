

# Etiquetar la imagen
docker tag e-commerce-backend-ecommerce_app rosaflores/e-commerce-backend:v1.0

# Subir la imagen a Docker Hub
docker push rosaflores/e-commerce-backend:v1.0

jenkis: 

helm uninstall jenkins
helm install jenkins jenkins/jenkins --set controller.serviceType=NodePort --set controller.nodePort=30000


kubectl exec --namespace default -it jenkins-0 -- cat /run/secrets/additional/chart-admin-password

5a3UFJXtvssl9FNoTxmE2M
PS C:\Abschlussprojekt\E-commerce\e-commerce-backend>