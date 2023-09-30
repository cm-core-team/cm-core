package models

import (
	"gorm.io/gorm"
)

type UserType int

const (
	Admin UserType = iota
	Regular
)

type User struct {
	gorm.Model

	Name         string
	Email        string
	PasswordHash string

	Type UserType

	CongregationID uint
	Congregation   Congregation

	JoinToken *Token `gorm:"foreignKey:UserID"`
}

func (user *User) Create(db *gorm.DB) {
	db.Create(&user)
}
