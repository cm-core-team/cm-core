package db

import (
	"backend/core/db/models"

	"gorm.io/gorm"
)

type DatabaseOps interface {
	FindToken(value string) (models.Token, error)
	FindAndUpdateUser(email string, congregationID uint) (models.User, error)

	FindUserByEmailWithToken(email string) (models.User, error)
	FindVerificationCodeWithSignature(signature string) (models.CongregationVerificationCode, error)
}

type OrmDatabaseOps struct {
	DB *gorm.DB
}

func (ormOps *OrmDatabaseOps) FindToken(value string) (models.Token, error) {
	var token models.Token
	result := ormOps.DB.Where("value = ?", value).First(&token)
	return token, result.Error
}

func (ormOps *OrmDatabaseOps) FindAndUpdateUser(email string, congregationID uint) (models.User, error) {
	var user models.User
	result := ormOps.DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}

	user.CongregationID = &congregationID
	result = ormOps.DB.Save(&user)

	return user, result.Error
}

func (ormOps *OrmDatabaseOps) FindUserByEmailWithToken(email string) (models.User, error) {
	var user models.User
	result := ormOps.DB.Preload("JoinToken").Where("email = ?", email).First(&user)

	return user, result.Error
}

func (ormOps *OrmDatabaseOps) FindVerificationCodeWithSignature(signature string) (models.CongregationVerificationCode, error) {
	var verificationCode models.CongregationVerificationCode
	dbInst := ormOps.DB.Where(&models.CongregationVerificationCode{
		CongregationSignature: signature,
	}).First(&verificationCode)

	return verificationCode, dbInst.Error
}
