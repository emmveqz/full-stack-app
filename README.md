# Fuill Stack App


### Pre-requisites

 - Have `docker` and `docker-compose` installed


### Instructions

 - Set your environment variables in [`.env`](./.env)
 - Build and run the app with:  
   `docker-compose up node_react_app`
 - (Alternatively) you can run it dettached mode:  
   `docker-compose up -d node_react_app`
 - Access the app in your browser with the url:  
   `http://localhost:8080`


### Clean/reset containers
 - Stop (and optionally remove) the containers:  
   `docker-compose rm -s node_react_app`  
   `docker-compose rm -s postgres_db`
 - Remove the app images:  
   `docker image rm full-stack-app_node_react_app:latest`  
   `docker image rm full-stack-app_postgres_db:latest`
