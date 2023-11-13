package models

import "gorm.io/gorm"

type Congregation struct {
	gorm.Model

	Name        string
	Area        string
	Address     string
	PhoneNumber string

	Users []User `gorm:"foreignKey:CongregationID"`
}
