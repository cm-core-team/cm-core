package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Name         string
	PasswordHash string

	CongregationID uint
	Congregation   Congregation
}
