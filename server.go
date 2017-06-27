package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"./db"
)

type Stru struct{
	Id string `json:"id"`
	Nome string	`json:"nome"`
}

func main(){
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.HandleFunc("/teste",func (w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		//fmt.Println(r.Form)
		//fmt.Println(r.FormValue("teste"))
		js,err := json.Marshal(Stru{"ID","Nome"})

		if err != nil{
			panic(err)
		}
		fmt.Fprintf(w,string(js))
		//fmt.Println(string(js))
	})

	http.HandleFunc("/movie-id",func (w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		//fmt.Println(r.Form)
		//fmt.Println(r.FormValue("id"))

		movie,err := db.GetMovie(r.FormValue("id"))

		if err != nil{
			fmt.Println("error")
			return
		}

		js,err := json.Marshal(movie)

		if err != nil{
			panic(err)
		}
		fmt.Fprintf(w,string(js))
		//fmt.Println(string(js))
	})

	http.HandleFunc("/movies",func (w http.ResponseWriter, r *http.Request){
		//r.ParseForm()
		//fmt.Println(r.Form)
		//fmt.Println(r.FormValue("teste"))
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
		//fmt.Println(string(js))
	})

	fmt.Println("Connected")
	http.ListenAndServe(":8000", nil)
}
