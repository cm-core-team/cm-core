package services

import (
	"backend/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUserInDB(dto UserDTO, db *gorm.DB) (models.User, error) {
	// Hash user password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(dto.Password), 8)

	// Remove password from response
	dto.Password = ""

	// Fetch DB context
	user := models.User{
		Email:        dto.Email,
		PasswordHash: string(hashedPassword),
	}
	user.Create(db)

	return user, err
}
