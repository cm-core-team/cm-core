package token

type CreateTokenDTO struct {
	UserEmail       string `json:"userEmail" validate:"required"`
	CreatedByUserId uint   `json:"createdByUserId" validate:"required"`
}
