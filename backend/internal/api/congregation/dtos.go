package congregation

import "backend/internal/models"

type VerifyCongregationPhoneDTO struct {
	UserCode     string              `json:"userCode"`
	Congregation models.Congregation `json:"congregation"`
}

type SendCongregationVerificationCodeDTO struct {
	PhoneNumber  string              `json:"phoneNumber"`
	Congregation models.Congregation `json:"congregation"`
}

type DeleteCongregationDTO struct {
	CongregationId uint `json:"congregationId"`
}
