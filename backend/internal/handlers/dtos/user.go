package dtos

import "backend/internal/models"

type CreateUserDTO struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`

	Type      models.UserType `json:"type"`
	JoinToken *models.Token   `json:"joinToken" gorm:"foreignKey:UserID"`
}

type LoginUserDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type BindAdminToCongregationDTO struct {
	AdminID        string `json:"adminId"`
	CongregationID string `json:"congregationId"`
}
