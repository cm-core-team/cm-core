package handlers

import (
	"backend/internal/common"
	"backend/internal/handlers/dtos"
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUser(ctx *gin.Context) {
	/**
	 * Create a new user in the DB
	 */

	var dto dtos.CreateUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	user, err := services.CreateUserInDB(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"user": user})
}

func VerifyToken(ctx *gin.Context) {
	/**
	 * Verify that a user's token matches it's assigned token
	 */

	var dto services.JoinTokenMatchDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	err = services.VerifyToken(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	err = services.BindUserToCongregation(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{"message": "Token matches"})
}
