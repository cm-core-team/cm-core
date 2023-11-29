package dtos

type VerifyCongregationPhoneDTO struct {
	UserCode       string `json:"userCode"`
	CongregationId uint   `json:"congregationId"`
}

type SendCongregationVerificationCodeDTO struct {
	CongregationId uint `json:"congregationId"`
}

type DeleteCongregationDTO struct {
	CongregationId uint `json:"congregationId"`
}
