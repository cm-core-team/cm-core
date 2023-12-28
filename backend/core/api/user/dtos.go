package user

import "backend/internal/models"

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
	AdminID        string `json:"adminId"`
	CongregationID string `json:"congregationId"`
}

type JoinTokenMatchDTO struct {
	Email          string `json:"email"`
	JoinTokenValue string `json:"tokenValue"`
}
