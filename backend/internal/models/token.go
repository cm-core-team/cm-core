package models

import "gorm.io/gorm"

type Token struct {
	/**
	 * The token generated for a user to join a congregation
	 */

	gorm.Model

	ID uint `json:"id" gorm:"primarykey"`

	TokenValue string `json:"tokenValue"`

	UserID          uint `json:"userId"`
	CongregationID  uint `json:"congregationId"`
	CreatedByUserId uint `json:"createdByUserId"`
}
