package models

import "gorm.io/gorm"

type Congregation struct {
	gorm.Model

	Name string
	Area string

	Users []User `gorm:"foreignKey:CongregationID"`
}
