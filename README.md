# Deployment with Digital Ocean

URL http://www.bonnethood.com/

#### Yaml files

Please update the yaml file to hsot your domaine name

#### Setup Digital Ocean - Ingress

#### Github secret

Create: (1) DIGITALOCEAN_ACCESS_TOKEN, (2) DOCKER_USERNAME, (3) DOCKER_PASSWORD

#### Doctl

Create an API KEY

> doctl auth init   doctl auth init   

> doctl kubernetes cluster kubeconfig save ticketing

Refer to Official Documentation (Updated April 28, 2021)
> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/do/deploy.yaml

#### Create secrets

> kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=WEBSITE_SECRET

> kubectl create secret generic jwt-secret --from-literal=JWT_KEY=my_key

> kubectl get secret  

#### Use kubectl of Digital Ocean (cluster)

> kubectl config use-context do-tor1-ticketing  (example)

# Local Machine with GCP

<img src="https://github.com/poboisvert/FirstGCP/blob/main/GCP.png" width="450" />

## Typescript - Configuration

The parent folder of /src. Please run:

> npm install node-nats-streaming ts-node-dev typescript @types/node

> tsc -- init

## NATS.io

NATS is not used and NATS Streaming Server is used in this application

https://docs.nats.io/

### Docker - Configuration

> COPY . .

copies the entire project, recursively into the container for the build.

#### Installation

Step 1:

Step 2: Build an Image

> cd ticketing/auth

> docker build -t pob944/auth .

> docker push pob944/auth

> cd ticketing/orders

> docker build -t pob944/orders .

> docker push pob944/orders

> cd ticketing/tickets

> docker build -t pob944/tickets .

> docker push pob944/tickets

> cd ticketing/client

> docker build -t pob944/client .

> docker push pob944/client

> cd ticketing/expiration

> docker build -t pob944/expiration .

> docker push pob944/expiration

We need to build the image at least once.

## K8s - Configuration

Simply adjust the configuration in "infrastructure/k8s" and edit the bottom for all the files.

### K8S - Secret for JWT (This must be edited when the project is rerun)

> kubectl create secret generic jwt-secret --from-literal=JWT_KEY=my_key

> kubectl create secret generic stripe-secret --from-literal STRIPE_KEY='STRIPE_WEBSITE_SECRET_KEY'

> kubectl get secrets

## Google Cloud - Configuration

## Create an account

> https://cloud.google.com/free

Please for most file you will use the project ID and the timezone is important. The project is using a "Kubernetes clusters" with a standard configuration.

### Steps:

#### GCP (This must be edited when the project is rerun)

This cloud still use the Docker IDE and the kubernetes must use the correct config file.

> gcloud init OR skaffold brew install --cask google-cloud-sdk

The initialization must use the same timezone as the Kubernetes clusters "us-central1-c".

- Enable "Cloud Build API"

- Enable - Tools - Cloud Build

##### Edit yaml to the project name

Remove/remplace:

- local push: false add "googleCloudBuild"
  For:
- us-gcr.io/ticketing-dev/<project_name>

#### Skaffold with GCP - Configuration

Load balancer IP address in GCP - Networking - Load Balancing

> sudo nvim /etc/hosts

- Add a domain name associated with Ingress NGINX IP from GCP

#### Import the Cluster to the local Docker

> gcloud container clusters get-credentials ticketing-dev

#### NGINX settings (Load Balancer in GCP) (This must be edited when the project is rerun)

> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml

Source: https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke

#### Skaffold is working

Please do the steps before or the new from the documentation. Otherwise, the application will not work.

> skaffold dev

## If GCP user not found

> gcloud auth application-default login

## Skaffold

From now the Skaffold will push the image on the cloud.

> cd ticketing

> skaffold dev

EDIT: If unsafe error in browser. type:

> thisisunsafe

## Public NPM Package

npm login

npm publish --access public

npm version patch

### Nats-server

in nats-test

> k port-forward nats-depl-74d4d5f47c-2q74m 4222:4222

> npm run listen

> Post with POSTMAN

### NGINX x509 error certification

> kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
