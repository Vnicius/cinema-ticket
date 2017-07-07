package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"./db"
	"strings"
	"sync"
)

//Convert the matrix in string to a bool matrix
func matrixParse(matrix string) [][]bool{
	splits := strings.Split(matrix[2:len(matrix)-2],"],[")
	result := make([][]bool, len(splits))
	for index, value := range splits{
		for _, v := range strings.Split(value,","){
			if v == "false"{
				result[index] =  append(result[index], false)
			}else{
				result[index] =  append(result[index], true)
			}
		}
	}
	return result
}

var mux sync.Mutex

func main(){
	http.Handle("/", http.FileServer(http.Dir("./")))

	http.HandleFunc("/getSeats",func (w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		//fmt.Println(r.Form)
		//fmt.Println(r.FormValue("id"))
		//Get a movie by id
		movie,err := db.GetSeats(r.FormValue("id"),r.FormValue("timeIndex"))

		if err != nil{
			fmt.Println("error")
			return
		}

		js,err := json.Marshal(movie)

		if err != nil{
			panic(err)
		}
		fmt.Fprintf(w,string(js))	//return the movie
	})

	http.HandleFunc("/buy",func (w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		ok, err := db.UpdateSeats(r.FormValue("id"), r.FormValue("hour"),r.FormValue("timeIndex"),matrixParse(r.FormValue("seats")),&mux)

		if err != nil{
			fmt.Println("error")
			return
		}
		if ok{
			fmt.Fprintf(w,"ok")
		}else{
			fmt.Fprintf(w,"no")
		}
	})

	http.HandleFunc("/movies",func (w http.ResponseWriter, r *http.Request){
		//Return all the movies from the database
		movies,err := db.GetMovies()

		if err != nil{
			fmt.Println("error")
			return
		}

		js,err := json.Marshal(movies)

		if err != nil{
			panic(err)
		}

		fmt.Fprintf(w,string(js))
	})

	fmt.Println("Connected")
	http.ListenAndServe(":8000", nil)
}
