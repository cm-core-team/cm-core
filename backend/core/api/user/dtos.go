package user

import "backend/core/db/models"

type CreateUserDTO struct {
	FirstName string `json:"firstName" validate:"required"`
	LastName  string `json:"lastName" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`

	Type models.UserType `json:"type" validate:"required"`
}

type LoginUserDTO struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type BindAdminToCongregationDTO struct {
	CongregationID uint `json:"congregationId" validate:"required"`
}

type JoinTokenMatchDTO struct {
	Email          string `json:"email" validate:"required"`
	JoinTokenValue string `json:"tokenValue" validate:"required"`
}
