package services

import (
	"backend/internal/models"
	"fmt"

	"gorm.io/gorm"
)

func CreateCongregationInDB(congregation models.Congregation, db *gorm.DB) error {
	result := db.Create(&congregation)
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
