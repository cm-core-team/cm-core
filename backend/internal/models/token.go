package models

import "gorm.io/gorm"

type Token struct {
	gorm.Model

	TokenValue string

	UserID         uint
	CongregationID uint
}
