package models

import (
	"gorm.io/gorm"
)

type UserType string

const (
	Admin   UserType = "ADMIN"
	Regular UserType = "REGULAR"
)

type User struct {
	gorm.Model

	ID uint `json:"id" gorm:"primarykey"`

	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email        string `json:"email"`
	PasswordHash string `json:"-"`

	Type UserType `json:"type"`

	CongregationID *uint         `json:"congregationId"`
	Congregation   *Congregation `json:"congregation" gorm:"foreignKey:CongregationID"`

	JoinToken *Token `json:"joinToken" gorm:"foreignKey:UserID"`
}

func (user *User) Create(db *gorm.DB) {
	db.Create(&user)
}
