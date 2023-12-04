package services

import (
	"backend/internal/handlers/dtos"
	"backend/internal/models"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUserInDB(dto dtos.CreateUserDTO, db *gorm.DB) (models.User, error) {
	// Hash user password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(dto.Password), 12)

	// Remove password from response
	dto.Password = ""

	// Fetch DB context
	user := models.User{
		FirstName:    dto.FirstName,
		LastName:     dto.LastName,
		Email:        dto.Email,
		PasswordHash: string(hashedPassword),
		Type:         dto.Type,
		JoinToken:    dto.JoinToken,
	}
	user.Create(db)

	return user, err
}

func VerifyToken(dto JoinTokenMatchDTO, db *gorm.DB) error {
	var user models.User
	result := db.Where(&models.User{Email: dto.Email}).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			fmt.Println("[Error] User not found")
			return errors.New("user not found")
		} else {
			fmt.Println("[Error]", result.Error)
			return result.Error
		}
	}

	tokenMatches := user.JoinToken.TokenValue == dto.JoinTokenValue
	if !tokenMatches {
		fmt.Println("[Error] Token does not match")
		return errors.New("incorrect token provided")
	}

	return nil
}

func BindUserToCongregation(dto JoinTokenMatchDTO, db *gorm.DB) error {
	/**
	 * With the CORRECT token, get the token's congregation and bind it to the user
	 */

	// Find the token object that matches the token value
	var token models.Token
	db.Where(&models.Token{TokenValue: dto.JoinTokenValue}).First(&token)

	// Update the user's congregation to the token's congregation
	var user models.User
	result := db.Where(&models.User{Email: dto.Email}).First(&user)
	if result.Error != nil {
		fmt.Println("[Error]", result.Error)
		return result.Error
	}

	// Congregation update
	user.CongregationID = &token.CongregationID
	db.Save(&user)
	// Update the Congregation based on CongregationID (preloading)
	db.Preload("Congregation").First(&user, user.ID)

	return nil
}
