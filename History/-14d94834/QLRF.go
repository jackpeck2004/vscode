package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"reflect"

	"github.com/T-W-I-N/media-center/backend/models"
	"github.com/gorilla/mux"
	"github.com/gosimple/slug"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// PrHandler struct which encloses actual handlers
type PrHandler struct {
	Logger *log.Logger
	Router *mux.Router
	Db     *mongo.Database
	ctx    context.Context
	col    *mongo.Collection
}

// HandlePrs is responsible for handling all routing and initiazling the handler
func (h *PrHandler) HandlePrs() {
	h.col = h.Db.Collection("prs")
	//h.ctx, _ = context.WithTimeout(context.Background(), 10*time.Second)
	h.ctx = context.TODO()

	h.Router.HandleFunc("/prs", h.getAllPrs).Methods("GET")
	h.Router.HandleFunc("/pr", h.insertPr).Methods("POST")
	h.Router.HandleFunc("/pr", h.getSinglePr).Methods("GET")
	h.Router.HanldeFunc("/pr/:id", h.updateSinglePr).Methods("PATCH")

}

func (h *PrHandler) updateSinglePr(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var pr models.Pr
	json.NewDecoder(r.Body).Decode(&pr)
	filter := bson.D{{"_id", id}}
	update := bson.D{
		{"$set", bson.D{
			{"title", pr.Title},
			{"content", pr.Content},
			{"date", pr.Date},
		}},
	}
	_, err := h.col.UpdateOne(h.ctx, filter, update)
	if err != nil {
		h.Logger.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func (h *PrHandler) getSinglePrBySlug(w http.ResponseWriter, r *http.Request) {
	// get by slug
	slug := r.URL.Query().Get("slug")

	singleResult := h.col.FindOne(h.ctx, bson.M{"slug": slug})

	if err := singleResult.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var fetchedPr models.Pr
	err := singleResult.Decode(&fetchedPr)
	if err != nil {
		h.Logger.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fetchedPr)
}

func (h *PrHandler) getSinglePrByID(w http.ResponseWriter, r *http.Request) {
	// get by slug
	id := r.URL.Query().Get("id")

	singleResult := h.col.FindOne(h.ctx, bson.M{"id": id})

	if err := singleResult.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var fetchedPr models.Pr
	err := singleResult.Decode(&fetchedPr)
	if err != nil {
		h.Logger.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fetchedPr)
}

func (h *PrHandler) getSinglePr(w http.ResponseWriter, r *http.Request) {
	keys := reflect.ValueOf(r.URL.Query()).MapKeys()

	switch keys[0].String() {
	case "slug":
		h.getSinglePrBySlug(w, r)
		break
	case "id":
		h.getSinglePrByID(w, r)
		break
	}
}

func (h *PrHandler) insertPr(w http.ResponseWriter, r *http.Request) {
	var prToInsert models.Pr

	err := json.NewDecoder(r.Body).Decode(&prToInsert)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	prToInsert.ID, err = gonanoid.New()
	prToInsert.Slug = slug.Make(prToInsert.Title)

	if !prToInsert.IsValid() {
		http.Error(w, "PR in body is invalid", http.StatusBadRequest)
		return
	}

	insertStatus, err := h.col.InsertOne(h.ctx, prToInsert)
	if err != nil {
		h.Logger.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.Logger.Printf("Inserted into db: %s", insertStatus.InsertedID)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(insertStatus)

}

func (h *PrHandler) getAllPrs(w http.ResponseWriter, r *http.Request) {
	var prs []models.Pr
	cursor, err := h.col.Find(h.ctx, bson.M{})
	if err != nil {
		h.Logger.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = cursor.All(h.ctx, &prs); err != nil {
		h.Logger.Printf(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(prs)
}
