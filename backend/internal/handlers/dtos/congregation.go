package dtos

import "backend/internal/models"

type VerifyCongregationPhoneDTO struct {
	UserCode     string              `json:"userCode"`
	Congregation models.Congregation `json:"congregation"`
}

type SendCongregationVerificationCodeDTO struct {
	Congregation models.Congregation `json:"congregationId"`
}

type DeleteCongregationDTO struct {
	CongregationId uint `json:"congregationId"`
}
