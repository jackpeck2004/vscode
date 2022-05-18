package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/markbates/goth/gothic"
)

// AuthHandler struct which encloses actual handling
type AuthHandler struct {
	Logger        *log.Logger
	Router        *mux.Router
	ClientURL     string
	CallbackRoute string
}

// HandleAuth is responsible for handling all routing for his specific handler
func (h *AuthHandler) HandleAuth() {
	h.Router.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, r *http.Request) {
		gothic.BeginAuthHandler(w, r)
	}).Methods("GET")

	h.Router.HandleFunc("/auth/{provider}/callback", h.handleCallback).Methods("GET")

	h.Router.HandleFunc("/logout/{provider}", h.handleLogout).Methods("GET")
}

func (h *AuthHandler) handleCallback(w http.ResponseWriter, r *http.Request) {

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	http.Redirect(w, r, fmt.Sprintf("%s%s?authToken=%s", h.ClientURL, h.CallbackRoute, user.IDToken), http.StatusFound)
}

func (h *AuthHandler) handleLogout(w http.ResponseWriter, r *http.Request) {
	err := gothic.Logout(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	http.Redirect(w, r, h.ClientURL, http.StatusFound)
}
