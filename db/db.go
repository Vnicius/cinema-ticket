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

var urlDatabase = "localhost:27017"

func GetMovies() ([]Movie,error){
  //Get all the movies from the database
  session, err := mgo.Dial(urlDatabase) //open a sessin in the databse url

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
  //Get the movie from the databse by id
  session, err := mgo.Dial(urlDatabase)

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
  //Update the selecteds seats
  session,err := mgo.Dial(urlDatabase)

  if err != nil{
    return false,err
  }
  defer session.Close()

  c := session.DB("cinema").C("movies")

  result := Movie{}
  err = c.FindId(bson.ObjectIdHex(id)).One(&result) //get the selected movie by the id
  index,err := strconv.Atoi(timeIndex)  //get the index of the selected time
  dbSeats := result.Times[index].Seats  //get all the seats from the selected session

  if err != nil{
    return false,err
  }

  //check if the selecteds seats are free. Because of the concurrence this check is necessary
  for i, value := range seats{
    for j, v := range value{
      if v && !(dbSeats[i][j]){
        return false,nil
      }
    }
  }
  //set the selected seats in the matrix
  for i, value := range seats{
    for j, v := range value{
      if v {
        dbSeats[i][j] = false
      }
    }
  }

  condtion := bson.M{"_id":bson.ObjectIdHex(id), "times.hour":hour}
  change := bson.M{"$set":bson.M{"times.$.seats":dbSeats}}
  //update the new seats states
  err = c.Update(condtion,change)

  if err != nil{
    return false,err
  }

  return true,nil
}
