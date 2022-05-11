package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/markbates/goth/gothic"
)

type AuthHandler struct {
	Logger      *log.Logger
	Router      *mux.Router
	CallbackUrl string
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

	http.Redirect(w, r, fmt.Sprintf("http://localhost:3000/auth/callback?authToken=%s", user.IDToken), http.StatusFound)

	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(r.URL.Query())
}
