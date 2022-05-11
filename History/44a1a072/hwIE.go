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
	h.Router.HandleFunc("/auth/{provider}/callback", h.handleCallback).Methods("GET")

	h.Router.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, r *http.Request) {
		q := r.URL.Query()
		q.Add("banana", "ciao")
		r.URL.RawQuery = q.Encode()
		gothic.BeginAuthHandler(w, r)
	}).Methods("GET")
}

func (h *AuthHandler) handleCallback(w http.ResponseWriter, r *http.Request) {

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		// fmt.Fprintln(w, err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// TODO: save the token to the session

	// http.Redirect(w, r, fmt.Sprintf("%s?authToken=%s", r.URL.Query().Get("banana"), user.IDToken), http.StatusFound)

	fmt.Println(user.IDToken)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(r.URL.Query())
}
