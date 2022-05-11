package handlers

import (
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

	h.Router.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, req *http.Request) {
		gothic.BeginAuthHandler(w, req)
	}).Methods("GET")
}

func (h *AuthHandler) handleCallback(w http.ResponseWriter, req *http.Request) {

	user, err := gothic.CompleteUserAuth(w, req)
	if err != nil {
		// fmt.Fprintln(w, err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// TODO: save the token to the session

	http.Redirect(w, r, fmt.Sprintf("%s?authToken=%s", r.URL.Query().Get("callbackUri"), user.IDToken), http.StatusFound)

	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(user)
}
