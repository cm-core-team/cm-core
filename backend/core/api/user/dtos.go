package user

import "backend/core/db/models"

type CreateUserDTO struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`

	Type models.UserType `json:"type"`
}

type LoginUserDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type BindAdminToCongregationDTO struct {
	CongregationID uint `json:"congregationId"`
}

type JoinTokenMatchDTO struct {
	Email          string `json:"email"`
	JoinTokenValue string `json:"tokenValue"`
}
