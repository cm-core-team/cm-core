package services

import (
	"backend/internal/models"

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
