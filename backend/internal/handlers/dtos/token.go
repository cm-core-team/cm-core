package dtos

type CreateTokenDTO struct {
	UserID          uint `json:"userId"`
	CreatedByUserId uint `json:"createdByUserId"`
}
