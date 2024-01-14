package models

import "gorm.io/gorm"

func SetupModels(db *gorm.DB) {
	db.AutoMigrate(
		&User{},
		&Congregation{},
		&Token{},
		&CongregationVerificationCode{},
	)
}
