package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Attachment struct contains the structure of the file attachments of the Pr
type Attachment struct {
	// TODO: implement Attachment struct
}

// Pr struct declares the model for the Pr
type Pr struct {
	id          primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	ID          string             `bson:"id,omitempty" json:"id"`
	Title       string             `bson:"title,omitempty" json:"title"`
	Subject     string             `bson:"subject,omitempty" json:"subject"`
	Date        time.Time          `bson:"date,omitempty" json:"date"`
	Content     string             `bson:"content,omitempty" json:"content"`
	Attachments []Attachment       `bson:"attachments" json:"attachments"`
	Slug        string             `bson:"slug,omitempty" json:"slug"`
}

// IsValid checks whether the Pr is valid
func (pr *Pr) IsValid() bool {
	// check if any field is empty
	sum := len(pr.ID) * len(pr.Title) * len(pr.Subject) * len(pr.Content) * len(pr.Date.String()) * len(pr.Slug)
	if sum != 0 {
		return true
	}

	return false
}
