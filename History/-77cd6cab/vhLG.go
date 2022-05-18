package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/T-W-I-N/media-center/backend/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var logger = log.New(os.Stdout, log.Default().Prefix(), log.Default().Flags())
var mongoURI string
var port string
var clientID = "197732338786-fs0ev5jkdeq5l183pbmmqp7dphi6b8gl.apps.googleusercontent.com"
var clientSecret = "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"
var clientURL string

func main() {
	/*
		MongoDB Client Setup
	*/
	mongoURI = os.Getenv("MONGO_URI")
	if len(mongoURI) == 0 {
		mongoURI = "mongodb://localhost:27018"
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		logger.Fatal(err)
	}
	ctx, cancelContext := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		logger.Fatal(err)
		cancelContext()
	}
	defer client.Disconnect(ctx)

	// select the database to use

	database := client.Database("media-center")

	/*
	   Session and Cookie Config
	*/

	sessionSecret := "pkj32lkerjw90ffjdcklsdg9-poj"
	maxAge := 86400 * 30 // 30 days
	isProd := false

	store := sessions.NewCookieStore([]byte(sessionSecret))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
		google.New(clientID, clientSecret, "http://localhost:5001/auth/google/callback", "email", "profile"),
	)

	/*
		Web Server Setup
	*/

	port = os.Getenv("PORT")
	if len(port) == 0 {
		port = "5001"
	}

	clientURL = os.Getenv("CLIENT_URL")

	if len(clientURL) == 0 {
		clientURL = "http://localhost:3000"
	}

	muxRouter := mux.NewRouter()

	prHandler := handlers.PrHandler{
		Logger: logger,
		Router: muxRouter,
		Db:     database,
	}

	prHandler.HandlePrs()

	authHandler := handlers.AuthHandler{
		Logger:        logger,
		Router:        muxRouter,
		ClientURL:     clientURL,
		CallbackRoute: "/auth/callback",
	}

	authHandler.HandleAuth()

	http.Handle("/", muxRouter)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{clientURL},
		AllowCredentials: true,
	})

	fmt.Println("Allowed Origins", c.Handler.AllowedOrigins)

	handler := c.Handler(muxRouter)

	log.Println("Listening on port", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handler))
}
