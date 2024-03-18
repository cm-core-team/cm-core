package congregation

import (
	"backend/core/common"
	"backend/core/db"
	"backend/core/db/models"
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCongregationInDB(congregation *models.Congregation, db *gorm.DB) error {
	result := db.Create(congregation)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func HasUniqueSignature(congregation models.Congregation, db *gorm.DB) (bool, error) {
	var count int64
	err := db.
		Model(&models.Congregation{}).
		Where(&models.Congregation{Signature: congregation.Signature}).
		Count(&count).Error

	return count == 0, err
}

func SendVerificationCode(verificationCode models.CongregationVerificationCode) {
	fmt.Println("[SendVerificationCode] sending!")

	// TODO
}

func ScheduleVerificationCodeRemoval(verificationCode models.CongregationVerificationCode, db *gorm.DB) error {
	// TODO (Jude): Create a CRON function to schedule a delete
	// Right now we are just scheduling a soft delete

	// Will be 'removed' 10 mins after creation

	return nil
}

func CheckVerificationCode(dto VerifyCongregationPhoneDTO, dbOps db.DatabaseOps, ctx *gin.Context) error {
	// If we are testing locally, allow any input
    env := common.GetEnvSecrets().Environment
	if env == "local" || env == "dev" {
		return nil
	}

	// Find a verificationCode with a matching signature
	verificationCode, err := dbOps.FindVerificationCodeWithSignature(dto.Congregation.Signature)
	if err != nil {
		fmt.Println("[VerifyCongregationPhone] congregation not found.")
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("[VerifyCongregationPhone] Verification code was not found")
		}

		return errors.New(common.UserErrorInstance.CongregationNotFound)
	}

	// Verification code check
	if dto.UserCode != verificationCode.Code {
		return errors.New(common.UserErrorInstance.IncorrectCongregationVerificationCode)
	}

	return nil
}

func CreateVerificationCode(dto SendCongregationVerificationCodeDTO, db *gorm.DB) (models.CongregationVerificationCode, error) {
	verificationCode := models.CongregationVerificationCode{
		CongregationSignature: dto.Congregation.Signature,
		PhoneNumber:           dto.PhoneNumber,
	}
	// Clear any entries that have the same congregation signature
	db.
		Unscoped().
		Where(&models.CongregationVerificationCode{
			CongregationSignature: dto.Congregation.Signature,
		}).
		Delete(&models.CongregationVerificationCode{})

	// Generate a new code
	verificationCode.RandomVerificationCode()

	dbInst := db.Create(&verificationCode)
	if dbInst.Error != nil {
		fmt.Println("[SendCongregationVerificationCode] couldn't create verification code")
		return models.CongregationVerificationCode{}, errors.New(common.UserErrorInstance.Unknown)
	}

	return verificationCode, nil
}
