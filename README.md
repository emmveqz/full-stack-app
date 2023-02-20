# Full Stack App


### Pre-requisites

 - Have `docker` and `docker-compose` installed
 - Create an access token from your github account with `read:packages` permissions.


### Instructions

 - Set your environment variables in [`.env`](./.env)  
   Set your github access token in:  
   `GITHUB_AUTH_TOKEN`  
   in order to be able to install npm packages from the `@emmveqz` scope.  
 - Build and run the app with:  
   `docker-compose up node_react_app`  
   (Alternatively) you can run it dettached mode:  
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
