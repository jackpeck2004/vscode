package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/markbates/goth/gothic"
)

type AuthHandler struct {
	Logger *log.Logger
	Router *mux.Router
}

func (h *AuthHandler) HandleAuth() {
	h.Router.HandleFunc("/auth/{provider}/callback", func(w http.ResponseWriter, req *http.Request) {

		user, err := gothic.CompleteUserAuth(w, req)
		if err != nil {
			fmt.Fprintln(w, err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}).Methods("GET")

	h.Router.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, req *http.Request) {
		gothic.BeginAuthHandler(w, req)
	}).Methods("GET")
}
