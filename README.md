# Typescript_Project
Homework

## Create Database
Create a database named "data1".

## Create Table Query

 ``` 
CREATE TABLE accounts ( 
id SERIAL UNIQUE, 
username varchar(50) NOT NULL, 
password varchar(255) NOT NULL, 
email varchar(100) NOT NULL, 
PRIMARY KEY (id) )
```

## Insert New Users

```
INSERT INTO accounts (id, username, password, email) VALUES (1, 'test', 'test', 'test@io.com');
```
## File Structure
```
\-- nodelogin
    |-- login.html
    |-- login.ts
    |-- .env
    \-- connection
        |-- connection.ts
    \-- static
        |-- style.css
```
        
        
 ## Install Modules
 
 * ``` npm i ``` or ``` npm install ```
 
 * ``` npm init ``` package json
 
 * ``` npm install express --save ``` node modules package lock json
 
 npm install dotenv
 
 npx tsc login.ts  login.js 
 
  * ``` npm install pg --save ``` module pg
 
 
 npm i --save-dev @types/pg
 
 npm i --save-dev @types/express-session
 
 tsc --init tsconfig.json
 
 
 Run code 
 
 
 
 

