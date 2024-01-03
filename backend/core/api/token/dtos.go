package token

type CreateTokenDTO struct {
	UserID          uint `json:"userId"`
	CreatedByUserId uint `json:"createdByUserId"`
}
