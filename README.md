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

