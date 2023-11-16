package models

import "gorm.io/gorm"

type Token struct {
	gorm.Model

	ID uint `json:"id" gorm:"primarykey"`

	TokenValue string `json:"tokenValue"`

	UserID          uint `json:"userId"`
	CongregationID  uint `json:"congregationId"`
	CreatedByUserId uint `json:"createdByUserId"`
}
