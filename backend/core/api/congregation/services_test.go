package congregation_test

import (
	"backend/core/api/congregation"
	"backend/core/db"

	"backend/core/db/models"

	"testing"

	"github.com/gin-gonic/gin"
)

func TestCheckVerificationCode(t *testing.T) {
	// Mock for DatabaseOps
	mockDBOps := new(db.MockDatabaseOps)

	correctCode := "123456"
	// wrongCode just needs to be different to correctCode
	wrongCode := "wrong-code"

	// Test for successful verification
	t.Run("Successful Verification", func(t *testing.T) {
		dto := congregation.VerifyCongregationPhoneDTO{
			UserCode: correctCode,
			Congregation: models.Congregation{
				Signature: "congregation-signature",
			},
		}
		verificationCode := models.CongregationVerificationCode{
			Code: correctCode,
		}

		mockDBOps.
			On("FindVerificationCodeWithSignature", dto.Congregation.Signature).
			Return(verificationCode, nil)

		// Mock Gin context if needed
		ctx := &gin.Context{}
		err := congregation.CheckVerificationCode(dto, mockDBOps, ctx)

		if err != nil {
			t.Errorf("CheckVerificationCode returned an unexpected error: %v", err)
		}

		mockDBOps.AssertExpectations(t)
	})

	// Test for incorrect code
	t.Run("Incorrect Code", func(t *testing.T) {
		dto := congregation.VerifyCongregationPhoneDTO{
			UserCode: wrongCode,
			Congregation: models.Congregation{
				Signature: "congregation-signature",
			},
		}
		verificationCode := models.CongregationVerificationCode{
			Code: correctCode,
		}

		mockDBOps.
			On("FindVerificationCodeWithSignature", dto.Congregation.Signature).
			Return(verificationCode, nil)

		// Also mock Gin context if needed
		ctx := &gin.Context{}
		err := congregation.CheckVerificationCode(dto, mockDBOps, ctx)

		if err == nil {
			t.Errorf("CheckVerificationCode expected an error, got nil")
		}

		mockDBOps.AssertExpectations(t)
	})
}
