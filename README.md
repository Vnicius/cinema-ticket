# Cinema Ticket
This project is a example of a site to buy tickets in a cinema, just for study.

## Dependences
  * [Go 1.8](https://golang.org/doc/go1.8)
  * [mgo.v2](http://gopkg.in/mgo.v2)
  * [mgo.v2/bson](http://gopkg.in/mgo.v2/bson)
  * [MongoDB 3.2.15](https://docs.mongodb.com/manual/installation/)

## How to use

### 1. Create the database
#### 1.1. Start the MongoDB

Windows
```
net start MongoDB
```

Linux
```
sudo start mongod start
```

#### 1.2. Createa the database `cinema`
```
db cinema
```
#### 1.3. Insert the data on `db/database-schema` file in the database

### 2. Run the server
```
go run server.go
```

### 3. Open the browser and access `localhost:8000`
