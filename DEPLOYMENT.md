# Deploying Job Tracker MERN app on AWS #

**Current deployed URL: http://3.73.83.101/**

Sources:

* https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2

## High-level approach ##

To get our app running on AWS, we do the following:
* Set up a Ubuntu linux server on the EC2 elastic compute cloud
* Install and run MongoDB and Node on that server
* Run an instance of the server on port 8000
* Build our client into static files that can be served by the webserver 
* Use Nginx (a reverse proxy) to map the main app to `/` port 80 and expose the API on `/api`

## Setting up the Ubuntu server ##

* Launch a free tier Ubuntu instance **20.04 SSD** with (mostly) default settings, but **_opening up port 80_** in the network security settings
* Log in with SSH (secure shell) - instructions for Windows using PuTTY and PuTTYgen are here: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html
    ```
    ssh -i <path to key file> ubuntu@<ip address>
    ```
* Install Node.js based on instructions from https://github.com/nodesource/distributions
    ```
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
* Install mongodb based on instructions from https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
    ```
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl status mongod
    sudo systemctl enable mongod
    ```
* Install PM2, a process manager for Node
    ```
    sudo npm install -g pm2
    sudo pm2 startup systemd
    ```
* Install Nginx
    ```
    sudo apt-get install -y nginx
    ```

## Deploying our app ##

Now we're going to clone our GIT repository and run the backend and frontend apps.

```
git clone https://github.com/somebunnycodes/job_tracker.git
```

## Running the backend ##

* Install backend dependencies
    ```
    cd ~/job_tracker/server
    npm install
    ```
* Start backend using PM2
    ```
    sudo pm2 start server.js
    ```
    The backend is now running locally on port 8000. Because we haven't opened that port, it's not accessible from outside - but we can test it using `curl`:
    ```
    curl http://localhost:8000
    ```
    We will make the API accessible publicly on port 80 using Nginx shortly.

## Building the frontend app ##

* Install frontend dependencies
    ```
    cd ~/job_tracker/client
    npm install
    ```
* Build the client app, making sure to specify our `REACT_APP_API_URI` environment variable to point at where our API will now be accessible. We're going to map this to path '/api' on port 80:
    ```
    REACT_APP_API_URI=http://<server IP address>/api npm run build
    ```
    Ideally we would replace the IP address with a public server name, but we'll leave it for now.

## Setting up Nginx to serve the React app and provide access to the API ##

Since our MERN Stack application is made up of two separate projects that both need to be accessed via the same port (HTTP on port 80), we're going to use NGINX as our public facing web server to receive requests for both the front-end and back-end, and decide where to send each request based on its path. Requests beginning with the path `/api/*` will be proxied through to the Node.js api running on port 4000, while other requests will serve the React front-end app and associated files (js/css/images).

* Delete the default Nginx config file
    ```
    sudo rm /etc/nginx/sites-available/default
    ```
* Launch the nano text editor to create an new default site config file
    ```
    sudo nano /etc/nginx/sites-available/default
    ```
* Paste in the following configuration:
    ```
    server {
        listen 80 default_server;
        server_name _;

        # react app & front-end files
        location / {
            root /home/ubuntu/job_tracker/client/build;
            try_files $uri /index.html;
        }

        # node api reverse proxy
        location /api/ {
            proxy_pass http://localhost:8000/;
        }
    }
    ```
* Restart Nginx
    ```
    sudo systemctl restart nginx
    ```

## Re-deploying / updating the app ##

To update the app to the latest version git, we simply update the code base, rebuild the app, and restart the backend:
```
cd ~/job_tracker
git pull
sudo pm2 reload server
cd client
REACT_APP_API_URI=http://<server IP address>/api npm run build
```
...and that's it!

-- WE DID IT! (Elle Woods voice!)