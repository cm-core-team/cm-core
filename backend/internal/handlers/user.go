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

/**
 * Given an ADMIN user and congregation (which you need to verify), update the
 * congregation id foreign key of the admin to the required
 */
// func BindAdminToCongregation(ctx *gin.Context) {
// 	var dto dtos.BindAdminToCongregationDTO
// 	err := ctx.BindJSON(&dto)
// 	if err != nil {
// 		ctx.JSON(http.StatusBadRequest, gin.H{
// 			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
// 		})
// 		return
// 	}

// 	/**
// 	 * TODO (Jude): After you bind the request body to our request DTO, we need to
// 	 * check that the user ID (Admin) matches the session token payload and is in fact an admin.
// 	 *
// 	 * Use: sessionTokenPayload := ctx.MustGet("sessionToken").(*security.SessionTokenPayload)
// 	 * to retrieve the current user ID (sessionTokenPayload.UserID) it will be saved in the session.
// 	 */

// 	db, _ := ctx.MustGet("db").(*gorm.DB)

// 	var adminUser models.User
// 	result := db.First(&adminUser, "id = ?", dto.AdminID)
// 	if result.Error != nil {
// 		fmt.Println("[BindAdminToCongregation] ")
// 		ctx.JSON(http.StatusNotFound, gin.H{
// 			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
// 		})
// 		return
// 	}

// 	// Update the adminUser congregation ID property to the congregation ID
// }
