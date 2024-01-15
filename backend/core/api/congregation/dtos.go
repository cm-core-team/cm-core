package congregation

import "backend/core/db/models"

type VerifyCongregationPhoneDTO struct {
	UserCode     string              `json:"userCode" validate:"required"`
	Congregation models.Congregation `json:"congregation" validate:"required"`
}

type SendCongregationVerificationCodeDTO struct {
	PhoneNumber  string              `json:"phoneNumber" validate:"required"`
	Congregation models.Congregation `json:"congregation" validate:"required"`
}

type DeleteCongregationDTO struct {
	CongregationId uint `json:"congregationId" validate:"required"`
}
