package handlers

import (
	"backend/internal/common"
	"backend/internal/handlers/dtos"
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/services/security"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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
	user, err := services.GenerateUserModel(dto, db)
	if err != nil {
		fmt.Println("[CreateUser] Could not generate user model.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	result := db.Create(&user)
	if result.Error != nil {
		fmt.Println("[CreateUser] Could not create user in database.")
		fmt.Println(result.Error)
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserAlreadyExists,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"user": user})
}

func LoginUser(ctx *gin.Context) {
	/**
	 * Compare the password hash and set a USER-level JWT.
	 */

	var dto dtos.LoginUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)

	var foundUser models.User
	result := db.First(&foundUser, "email = ?", dto.Email)
	if result.Error != nil {
		fmt.Println("[LoginUser] Could not find user")
		ctx.JSON(http.StatusNotFound, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserNotFound,
		})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.PasswordHash), []byte(dto.Password))
	if err != nil {
		fmt.Println("[LoginUser] Incorrect password")

		ctx.JSON(http.StatusNotAcceptable, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserPasswordInvalid,
		})
		return
	}

	sessionToken, err := security.GenerateJWT(strconv.FormatUint(uint64(foundUser.ID), 10))
	if err != nil {
		fmt.Println("[LoginUser] Couldn't generate JWT")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	sessionTokenExpiry := int(time.Hour * 24 * 14 / time.Second)

	cookie := &http.Cookie{
		Name:     "sessionToken",
		Value:    sessionToken,
		Path:     "/",
		Domain:   "",
		HttpOnly: true,
		MaxAge:   sessionTokenExpiry,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(ctx.Writer, cookie)

	ctx.JSON(http.StatusAccepted, gin.H{
		"sessionToken": sessionToken,
	})
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

func GetUser(ctx *gin.Context) {
	tokenRaw, exists := ctx.Get("sessionToken")

	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"err": "An internal server error seems to have happened. Please try another time."})
	}

	token, ok := tokenRaw.(string)

	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"err": "Session token is not a string"})

	}

	tokenPayload, _ := security.VerifyJWT(token)

	db, _ := ctx.MustGet("db").(*gorm.DB)

	user := db.First(&tokenPayload.UserID)

	if user.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"err": "An internal server error seems to have happened. Please try another time."})
	}

	ctx.JSON(http.StatusOK, gin.H{"data": user})
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
