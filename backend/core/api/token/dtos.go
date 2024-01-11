package token

type CreateTokenDTO struct {
	UserEmail       string `json:"userEmail"`
	CreatedByUserId uint   `json:"createdByUserId"`
}
