package models

import "gorm.io/gorm"

type Congregation struct {
	gorm.Model

	Name         string
	Area         string
	Address      string
	PhoneNumbers []CongregationPhone

	Users []User `gorm:"foreignKey:CongregationID"`
}

type CongregationPhone struct {
	Ext   string
	Phone string
}
