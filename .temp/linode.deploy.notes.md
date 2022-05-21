# Digital Ocean Deploy

To get our ssh key might have to cd into .ssh then run cat id_rsa.pub (copy paste this into digital oceans add ssh key thing)

- grab the address from digital ocean and ssh into it: `ssh root@<digital ocean address>
- `whoami` to verify root user

To change users so root isn't being used follow these steps

- `adduser <username>`
- you don't have to add the phone and other fields that prompt
- next type `usermod -aG sudo <username>` (gives user sudo access)

Create SSH folder with User SSH Access

- `mkdir /home/<username>/.ssh`
- copy old ssh keys to new file `cp /root/.ssh/authorized_keys /home/<username>/.ssh/authorized_keys`
- `cd home/<username>/.ssh && ls -la` to verify files
- `cd ..`
- `chown -R <username>:<username> .ssh/`
- `ls -la` to verify changes
- `cd .ssh && ls -la` to also verify these changes have been made
- `cd ..`
- `chmod 700 .ssh`
- `cd .ssh && ls -la` to check files
- `chmod 600 authorized_keys`
- `ls -la` to check again

Setup Firewall

- `cd ..` (making sure we are out of .ssh dir)
- `ufw allow OpenSSH`
- `ufw enable`
- `exit`

Now we can connect with the created user that is not root

`ssh <username>@<digital ocean address>`

Once logged in we need to create a sshd config
`sudo nano /etc/ssh/sshd_config`

This will help prevent people trying to access our server (preventative measures)

Once inside this file we need to edit the following:

- PermitRootLogin no
- PasswordAuthentication no

After this is done we need to restart a few things

- `sudo systemctl restart ssh`
- `sudo systemctl restart sshd`

Before Proceeding **Optional**

This step is optional but im not sure if this method has to be setup in order to use Github actions later. We could technically just clone the repo without setting up the below steps and just run the content, but this method might be required to used github actions (bottom of this note)

If we want we can add a deploy key thru github so we can ssh directly to the github repo. Google **generate ssh key** there will be a part we can copy that says something like ssh-keygen -t ...

run this inside the digital ocen client follow the steps
(keep hitting enter)

`cd .ssh && ls` then `cat <key github generated (id_ed???)>.pub` and copy the key and we can paste it to the deploy key in the repo (make sure repo is private) Now we can clone the ssh version from github

This is totally optional all these above steps, if this isn't done the following steps below should work perfectly fine as we will setup contunious deployments later and we technically only need to clone this repo once as we will setup a github action to push any changes made on our end to digital ocean.

Now to setup the website

- `sudo apt update && sudo apt upgrade`
- `sudo apt install nginx certbot python3-certbot-nginx`
- `sudo mkdir /var/www/<website-name>`
- `cd /var/www && ls -la`
- `sudo chown -R <username>:<username> <website-name>/`
- `sudo nano /etc/nginx/sites-available/<website-name>`

Inside this file we can edit and add things like the domain name

- server_name <website-name>.com
- gzip on;
- gzip_proxied any;
- gzip_types application/javascript application/x-javascript text/css text/javascript;
- gzip_comp_level 6;
- gzip_buffers 16 8k;
- gzip_min_length: 256;

Im not too sure about this next bit of code (example):

```s
location /_next/static/ {
  alias /var/www/<website-name>/.next/static/;
  expires 365d;
  access_log off;
}

location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

Our nginx default config probably will look like this for this servers use case (referencing from youtube video)

```s
...

location /api { 
  # try_files $uri $uri/ =404;
  proxy_pass http://localhost:5000/api;
}

# if we have images
location /images {
  proxy_pass http://localhost:5000/images;
}

location / { 
  proxy_pass http://localhost:3000;
}

...
```

Now we need to create a symbolic link to tell nginx that our site is available

Remove default site
- `sudo rm /etc/nginx/sites-enabled/default`
- then create a shortcut `sudo ln -s /etc/nginx/sites-available/<website> /etc/nginx/sites-enabled/<website>`

Next copy the IP Address of the server because we need to point our domain and stuff to it etc. Will have to go to namecheap and point the ip to it and do some config on digital ocean etc.

log back into ssh then `sudo systemctl restart nginx`

next `cd /var/www/` then because we have to clone website runu this first `sudo rm -rf <website>/` then clone the project. 

After that `sudo mv <cloned-website> <website>` (website is the old file we deleted but this creates a new one)

`sudo chown -R <username>:<username> <website>/`

`cd <website>` then run `sudo ufw allow "Nginx Full"`

run `sudo ufw status` to check status to make sure changes were made

Next Install NPM, Node, Yarn and PM2

Google how to download NVM and follow the steps to get the LTS version of NPM and NodeJS

Globally install yarn and pm2

cd into project `cd /var/www/<website>/` then `yarn` to install packages etc (yarn build client so we not running the development server!)

Once we have a production build of the server and client we can link **pm2** to both services.

Will have to do something like this to build the client
`pm2 start yarn --name <website> --start`

Will likely be these commands:

`pm2 start --name "client" yarn start` (from client dir)
`pm2 start --name "server" yarn start` (from server dir)

One of the final things to do the make it secure (https)
sudo certbot --nginx -d <website.com> then follow the steps (add email etc)

- Agree to terms
- No to sharing email electronically when it prompts
- On prompt to no redirect or not accept redirect (2)

Basic PM2 Commands (These are all done from /var/www/<website>)
pm2 stop <website>
pm2 delete <website>
pm2 start <website>

---

## This next section more pertains to setting up the server + client.

The above examples is mainly geared for just the client application using Digital Ocean. This next part is more geared towards the current setup im using. The above section is very useful for setting up a user and stuff so follow most of that but this next bit is how nginx is going to be setup

**Make sure to grab .env credentials from both directories**

Any enviroment variables or refernces to using the websites address can be refered to as the IP4 from digital ocean (http://178.128.32.180) for example rather than the actual domain name. Example: inside .env file 

APP_URL=http://178.128.32.180
ORIGIN=http://localhost:3000


## Github Actions to Auto Deploy

First we can google Run SSH command and github should have an acticle we can copy code from or reference to get started.

Create a .github and inside it put a workflows directory with a main.yml file. These will be referenced by Github Actions when its setup later

Example .yml file that will be used (secrets are inside repo)

```yaml
name: Pull code, rebuild files and restart pm2 processes

on: 
  push: 
    branches: [master]

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
    - name: Rebuild Repository
      uses: garygrossgarten/github-action-ssh@release
      with: 
        command: |
          cd <website dir>
          git pull
          yarn
          cd server && npx tsc
          cd ..
          cd client
          yarn build
          pm2 restart  server client
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        privateKey: ${{ secrets.PRIVATE_KEY }}
```
## Notes about this file above

- HOST will be IP OR DOMAIN NAME
- USERNAME is the DIGITAL OCEAN IP4 user (ie. root or <username>)
- PRIVATE_KEY we will have to generate another SSH certificate (like steps above), name email whatever but dont forget it. Then save that file to /<username | root>/.ssh/github. Then run `cat github` (to get ssh key copy it so we can paste it into the github repo as the PRIVATE KEY).After that run `cat.github.pub` and copy the key then run this command to copy + paste it to the authorized_keys file -- `echo "<copied key (e.g ssh-ed25519.....)> >> authorized_keys` then we can remove github and github.pub if we want.
