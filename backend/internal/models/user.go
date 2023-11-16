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

	ID uint `json:"id" gorm:"primarykey"`

	Name         string `json:"name"`
	Email        string `json:"email"`
	PasswordHash string

	Type UserType `json:"type"`

	CongregationID uint         `json:"congregationId"`
	Congregation   Congregation `json:"congregation" gorm:"foreignKey:CongregationID"`

	JoinToken *Token `json:"joinToken" gorm:"foreignKey:UserID"`
}

func (user *User) Create(db *gorm.DB) {
	db.Create(&user)
}
