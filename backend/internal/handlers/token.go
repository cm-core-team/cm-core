package handlers

import (
	"backend/internal/common"
	"backend/internal/handlers/dtos"
	"backend/internal/models"
	"backend/internal/services/security"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateToken(ctx *gin.Context) {
	// Ensure the user is authenticated
	sessionTokenPayload := ctx.MustGet("sessionToken").(*security.SessionTokenPayload)
	if sessionTokenPayload == nil {
		fmt.Println("[CreateToken] sessionToken invalid")
		ctx.JSON(http.StatusUnauthorized, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.AuthInvalid,
		})
		return
	}

	var dto dtos.CreateTokenDTO

	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[CreateToken] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Check that the sessionToken user ID matches the CreatedByUserId
	tokenMatches := sessionTokenPayload.UserID == strconv.FormatUint(uint64(dto.CreatedByUserId), 10)
	if !tokenMatches {
		fmt.Println("[CreateToken] token does not match created by user.")
		ctx.JSON(http.StatusUnauthorized, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.AuthInvalid,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)

	// Check that the targeted user actually exists
	var targetUser models.User
	queryResult := db.First(&targetUser, "id = ?", dto.CreatedByUserId)
	if queryResult.Error != nil {
		fmt.Println("[CreateToken] Can't find the target user.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Session token is valid and meets requirements

	// Find user
	var adminUser models.User
	queryResult = db.First(&adminUser, "id = ?", dto.CreatedByUserId)
	if queryResult.Error != nil {
		fmt.Println("[CreateToken] Can't find the admin user.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Create the actual join token
	token := models.Token{
		UserID:          dto.UserID,
		CreatedByUserId: dto.CreatedByUserId,
		CongregationID:  *adminUser.CongregationID,
	}
	token.GenerateTokenValue()
	db.Create(&token)

	ctx.JSON(http.StatusCreated, gin.H{
		"token": token,
	})
}
