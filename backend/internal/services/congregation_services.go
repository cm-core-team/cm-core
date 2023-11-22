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
