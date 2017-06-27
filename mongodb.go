package main

import(
  "fmt"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson")

type Person struct{
  Name string
  Phone string
}

type Time struct{
  Hour string `json: hour`
  Seats [][]bool `json: seats`
}

type Movie struct{
  Movie_name string `json: movie_name`
  Movie_img string `json: movie_img`
  Screen string `json: screen`
  Times []Time `json: times`
}

func main(){
  session, err := mgo.Dial("localhost:27017")

  if err != nil{
    panic(err)
  }
  defer session.Close()

  c := session.DB("cinema").C("movies")

  //err = c.Insert(&Person{"Joao","123456"})

  if err != nil{
    panic(err)
  }

  //res := []Person{}
  res := Movie{}
  err = c.Find(bson.M{}).One(&res)
  if err != nil{
    panic(err)
  }
  fmt.Println(res)
}
