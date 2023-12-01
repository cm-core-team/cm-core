package services

type CreateUserDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type JoinTokenMatchDTO struct {
	Email          string `json:"email"`
	JoinTokenValue string `json:"tokenValue"`
}
