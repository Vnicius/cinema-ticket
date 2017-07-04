package db

import(
  //"fmt"
  "strconv"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson")

type Time struct{
  Hour string `json:"hour"`
  Seats [][]bool `json:"seats"`
}

type Movie struct{
  Id bson.ObjectId `json:"id"        bson:"_id,omitempty"`
  Movie_name string `json:"movie_name"`
  Movie_img string `json:"movie_img"`
  Screen string `json:"screen"`
  Synopsis string `json:"synopsis"`
  Times []Time `json:"times"`
}

func GetMovies() ([]Movie,error){
  session, err := mgo.Dial("localhost:27017")

  if err != nil{
    return nil,err
  }
  defer session.Close()

  c := session.DB("cinema").C("movies")

  result := []Movie{}

  err = c.Find(bson.M{}).All(&result)

  if err != nil{
    return nil, err
  }

  return result, nil
}

func GetMovie(id string) (Movie,error){
  session, err := mgo.Dial("localhost:27017")

  if err != nil{
    return Movie{},err
  }
  defer session.Close()

  c := session.DB("cinema").C("movies")

  result := Movie{}

  err = c.FindId(bson.ObjectIdHex(id)).One(&result)

  if err != nil{
    return Movie{}, err
  }

  return result, nil
}

func UpdateSeats(id, hour, timeIndex string, seats [][]bool) (bool,error){
  session,err := mgo.Dial("localhost:27017")

  if err != nil{
    return false,err
  }
  defer session.Close()

  c := session.DB("cinema").C("movies")

  result := Movie{}
  err = c.FindId(bson.ObjectIdHex(id)).One(&result)
  index,err := strconv.Atoi(timeIndex)
  dbSeats := result.Times[index].Seats
  //fmt.Println(strconv.Atoi(timeIndex))
  //dbSeats := make([][]bool,4)
  if err != nil{
    return false,err
  }

  for i, value := range seats{
    for j, v := range value{
      if v && !(dbSeats[i][j]){
        return false,nil
      }
    }
  }

  for i, value := range seats{
    for j, v := range value{
      if v {
        dbSeats[i][j] = false
      }
    }
  }

  condtion := bson.M{"_id":bson.ObjectIdHex(id), "times.hour":hour}
  change := bson.M{"$set":bson.M{"times.$.seats":dbSeats}}

  err = c.Update(condtion,change)

  if err != nil{
    return false,err
  }

  return true,nil
}
