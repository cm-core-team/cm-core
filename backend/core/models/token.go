package models

import (
	"fmt"
	"math/rand"

	"gorm.io/gorm"
)

type Token struct {
	/**
	 * The token generated for a user to join a congregation
	 */

	gorm.Model

	ID uint `json:"id" gorm:"primarykey"`

	Value string `json:"value"`

	// Target user
	UserID uint `json:"userId"`
	// Congregation to bind to
	CongregationID uint `json:"congregationId"`
	// The ID of the user who created this token
	CreatedByUserId uint `json:"createdByUserId"`
}

func (token *Token) GenerateTokenValue() {
	/**
	 * Generate 5-digit token value in-place.
	 */

	code := fmt.Sprintf("%05d", rand.Intn(100000))
	token.Value = code
}
