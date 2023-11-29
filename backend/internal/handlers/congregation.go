package handlers

import (
	"backend/internal/common"
	"backend/internal/handlers/dtos"
	"backend/internal/models"
	"backend/internal/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCongregation(ctx *gin.Context) {
	/**
	 * Create a new congregation in the DB
	 */

	var dto models.Congregation
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[CreateCongregation] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)

	// Generate a signature and check if it exists
	dto.GenerateSignature()
	isUnique, err := services.HasUniqueSignature(dto, db)
	if err != nil {
		fmt.Println("[CreateCongregation] (signature check) Error creating congregation in database.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.FailedToCreateCongregation,
		})
		return
	}

	if !isUnique {
		fmt.Println("[CreateCongregation] Congregation is not unique.")
		ctx.JSON(http.StatusConflict, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationAlreadyExists,
		})
		return
	}

	err = services.CreateCongregationInDB(dto, db)
	if err != nil {
		fmt.Println("[CreateCongregation] Error creating congregation in database.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.FailedToCreateCongregation,
		})
		return
	}

	// The DTO will be updated in-place, so the ID property will also be updated
	ctx.JSON(http.StatusCreated, gin.H{"congregation": dto})
}

func DeleteCongregation(ctx *gin.Context) {
	var dto dtos.DeleteCongregationDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[DeleteCongregation] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	dbInst := db.Delete(&models.Congregation{}, dto.CongregationId)
	if dbInst.Error != nil {
		fmt.Println("[DeleteCongregation] couldn't delete congregation.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationNotFound,
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{})
}

func SendCongregationVerificationCode(ctx *gin.Context) {
	var dto dtos.SendCongregationVerificationCodeDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[SendCongregationVerificationCode] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)

	// Needs a signature
	dto.Congregation.GenerateSignature()
	verificationCode := models.CongregationVerificationCode{
		CongregationSignature: dto.Congregation.Signature,
	}
	verificationCode.RandomVerificationCode()

	dbInst := db.Create(&verificationCode)
	if dbInst.Error != nil {
		fmt.Println("[SendCongregationVerificationCode] couldn't create verification code")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	// TODO (Jude): need to connect to 3rd party OTP services
	services.SendVerificationCode(verificationCode)

	// Expire verification code
	err = services.ScheduleVerificationCodeRemoval(verificationCode, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{})
}

func VerifyCongregationPhone(ctx *gin.Context) {
	var dto dtos.VerifyCongregationPhoneDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[VerifyCongregationPhone] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}
	dto.Congregation.GenerateSignature()

	db, _ := ctx.MustGet("db").(*gorm.DB)

	// Find a verificationCode with a matching signature
	var verificationCode models.CongregationVerificationCode
	dbInst := db.Where(&models.CongregationVerificationCode{
		CongregationSignature: dto.Congregation.Signature,
	}).First(&verificationCode)
	if dbInst.Error != nil {
		fmt.Println("[VerifyCongregationPhone] congregation not found.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationNotFound,
		})
		return
	}

	// Verification code check
	if dto.UserCode != verificationCode.Code {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.IncorrectCongregationVerificationCode,
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{})
}
