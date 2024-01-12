package user

import (
	"backend/core/db"
	"backend/core/db/models"
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func GenerateUserModel(dto CreateUserDTO, db *gorm.DB) (models.User, error) {
	// Hash user password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(dto.Password), 12)
	if err != nil {
		return models.User{}, err
	}

	// Remove password from response
	dto.Password = ""

	// Fetch DB context
	user := models.User{
		FirstName:    dto.FirstName,
		LastName:     dto.LastName,
		Email:        dto.Email,
		PasswordHash: string(hashedPassword),
		Type:         dto.Type,
	}

	return user, err
}

func VerifyTokenMatch(dto JoinTokenMatchDTO, db *gorm.DB) error {
	var user models.User
	result := db.Preload("JoinToken").Where("email = ?", dto.Email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			fmt.Println("[Error] User not found")
			return errors.New("user not found")
		} else {
			fmt.Println("[Error]", result.Error)
			return result.Error
		}
	}

	if user.JoinToken == nil {
		fmt.Println("[Error] Token is nil")
		return errors.New("token doesn't exist")
	}

	tokenMatches := user.JoinToken.Value == dto.JoinTokenValue
	if !tokenMatches {
		fmt.Println("[Error] Token does not match")
		return errors.New("incorrect token provided")
	}

	return nil
}

func BindUserToCongregation(dto JoinTokenMatchDTO, dbOps db.DatabaseOps) (models.User, error) {
	// Find the token object that matches the token value
	token, err := dbOps.FindToken(dto.JoinTokenValue)
	if err != nil {
		fmt.Println("[Error]", err)
		return models.User{}, err
	}

	// Update the user's congregation to the token's congregation
	user, err := dbOps.FindAndUpdateUser(dto.Email, token.CongregationID)
	if err != nil {
		fmt.Println("[Error]", err)
		return models.User{}, err
	}

	return user, nil
}
