package token

import (
	"backend/core/common"
	"backend/core/db/models"
	"backend/core/services/security"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

/**
 * TODO: Need to JWTify the user so that we can verify that the admin user is the authenticated user.
 */

func CreateToken(ctx *gin.Context) {
	// Ensure the user is authenticated
	jwtPayload := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)

	var dto CreateTokenDTO

	err := common.BindAndValidate(ctx, dto)
	if err != nil {
		fmt.Println("[CreateToken] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Check that the sessionToken user ID matches the CreatedByUserId
	tokenMatches := jwtPayload.UserID == strconv.FormatUint(uint64(dto.CreatedByUserId), 10)
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
	queryResult := db.First(&targetUser, "email = ?", dto.UserEmail)
	if queryResult.Error != nil {
		fmt.Println("[CreateToken] Can't find the target user.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserNotFound,
		})
		return
	}

	// At this point session token is valid and meets requirements

	// Find user
	var adminUser models.User
	queryResult = db.First(&adminUser, "id = ?", dto.CreatedByUserId)
	if queryResult.Error != nil {
		fmt.Println("[CreateToken] Can't find the admin user.")
		fmt.Println(queryResult.Error.Error())
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Check that the admin user has already been assigned a congregation
	if adminUser.CongregationID == nil {
		fmt.Println("[CreateToken] Can't find the admin user's congregation.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationNotFound,
		})
		return
	}

	// Create the actual join token
	token := models.Token{
		UserID:          targetUser.ID,
		UserEmail:       dto.UserEmail,
		CreatedByUserId: dto.CreatedByUserId,
		CongregationID:  *adminUser.CongregationID,
	}
	token.GenerateTokenValue()
	db.Create(&token)

	ctx.JSON(http.StatusCreated, gin.H{
		"token": token,
	})
}
