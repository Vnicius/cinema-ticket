package main

import (
	"net/http"
	"fmt"
	"encoding/json"
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
	http.ListenAndServe(":8000", nil)
}