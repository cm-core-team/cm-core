package user

import (
	"backend/core/db"
	"backend/core/db/models"
	"errors"
	"log"

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

func VerifyTokenMatch(dto JoinTokenMatchDTO, dbOps db.DatabaseOps) error {
	user, err := dbOps.FindUserByEmailWithToken(dto.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("[Error] User not found")
			return errors.New("user not found")
		} else {
			log.Println("[Error]", err)
			return err
		}
	}

	if user.JoinToken == nil {
		log.Println("[Error] Token is nil")
		return errors.New("token doesn't exist")
	}

	tokenMatches := user.JoinToken.Value == dto.JoinTokenValue
	if !tokenMatches {
		log.Println("[Error] Token does not match")
		return errors.New("incorrect token provided")
	}

	return nil
}

func BindUserToCongregation(dto JoinTokenMatchDTO, dbOps db.DatabaseOps) (models.User, error) {
	// Find the token object that matches the token value
	token, err := dbOps.FindToken(dto.JoinTokenValue)
	if err != nil {
		log.Println("[Error]", err)
		return models.User{}, err
	}

	// Update the user's congregation to the token's congregation
	user, err := dbOps.FindAndUpdateUser(dto.Email, token.CongregationID)
	if err != nil {
		log.Println("[Error]", err)
		return models.User{}, err
	}

	return user, nil
}
