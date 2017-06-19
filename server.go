package main

import (
	"net/http"
	"fmt"
	"time"
)

func main(){
	http.Handle("/", http.FileServer(http.Dir("./")))
	http.HandleFunc("/teste",func (w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		//fmt.Println(r.Form)
		//fmt.Println(r.FormValue("teste"))
		fmt.Fprintf(w,r.FormValue("teste"))
		go teste()
	})
	http.ListenAndServe(":8000", nil)
}
