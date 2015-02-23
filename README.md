
# README #
 
# aswat #
 
 A PHP/AngularJs Application for test purpose
 The	purpose of this application is to be an evaluation or an assessment by	**ASWAT-TELECOM** .

#App Credentials#
	* Customer Role : customer / customer
	* Admin Role : admin / admin

### What is this repository for? ###
 
 * To	ensure the smooth progression of this app, The developer will factor in project planning and	specification into the early stages of the	project. The developer will	manage this app	using a structured and methodical approach, and this will	identify any objectives to	be achieved throughout	the course of the development and identify any	risks/dependencies,	 helping to agree responsibilities and define testing schedules.

 * Version 1
 
## How do I get set up? ##
 
* Get the source code


```
#!shell

cd Sites
git clone git@github.com:macherif/aswat.git

```


 * Database configuration
 
 Open the console and execute this code  :
 
 

```
#!shell

 mysql -uroot
```

 
 
 
```
#!sql

CREATE DATABASE aswat IF NOT EXISTS DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci; 
 
GRANT ALL ON aswat.* TO 'aswat'@'%' IDENTIFIED BY 'aswat';
 
GRANT ALL ON aswat.* TO 'aswat'@'localhost' IDENTIFIED BY 'aswat';
```

*For DB importation:*
 
 
```
#!shell

cd /Users/**your_username**/Sites/aswat/scripts
./robonaute.sh
```


Or you can use phpmyadmin to import **aswat.sql** 
 
 * Local Server Configuration For **MAC users** :
 
 
 
```
#!shell


 sudo vi /etc/hosts
```


 
 *Add this line:* 
 
 
```
#!shell


 127.0.0.1 dev.aswat.local
```


 *Then*
 
 

 
 
```
#!shell

sudo vi /etc/apache2/users/**your_username**.conf
```

 
 *then paste this content inside **your_username**.conf :*
 

```
#!apache

 <VirtualHost *:80>
 
         ServerName dev.aswat.local
 
         DocumentRoot "/Users/**your_username**/Sites/aswat"
 
         SetEnv APPLICATION_ENV "development"
 
         <Directory "/Users/**your_username**/Sites/aswat">
 
                 DirectoryIndex index.php
 
                 Options Indexes MultiViews FollowSymLinks
 
                 AllowOverride All
 
                 Order allow,deny
 
                 Allow from all
 
         </Directory>
 
         RewriteEngine on
 
         ErrorLog "| /usr/sbin/rotatelogs /var/log/apache2/error.aswat.%Y-%m-%d 86400"
 
         LogLevel warn
 
         CustomLog "| /usr/sbin/rotatelogs /var/log/apache2/access.aswat.%Y-%m-%d 86400" combined
 
 </VirtualHost>
```

 


```
#!shell

sudo apachectl restart
```


 
 * Dependencies
 * How to run tests
 * Deployment instructions
 
## Contribution guidelines ##
 
 * Writing tests
 * Code review
 * Other guidelines
 
## Who do I talk to? ##
 
 * Repo owner or admin
Add a comment to this line
 * Other community or team contact
