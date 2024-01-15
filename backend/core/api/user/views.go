package user

import (
	"backend/core/common"
	"backend/core/db"
	"backend/core/db/models"
	"backend/core/services/security"
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

	var dto CreateUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	user, err := GenerateUserModel(dto, db)
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

	var dto LoginUserDTO
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

func LogoutUser(ctx *gin.Context) {
	/**
	 * Remove the session token from the client.
	 */

	cookie := &http.Cookie{
		Name:     "sessionToken",
		Value:    "",
		Path:     "/",
		Domain:   "",
		HttpOnly: true,
		MaxAge:   -1,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(ctx.Writer, cookie)

	ctx.JSON(http.StatusOK, gin.H{})
}

func VerifyToken(ctx *gin.Context) {
	/**
	 * Verify that a user's token matches it's assigned token
	 */

	var dto JoinTokenMatchDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	dbInst, _ := ctx.MustGet("db").(*gorm.DB)
	dbOps := &db.OrmDatabaseOps{DB: dbInst}

	err = VerifyTokenMatch(dto, dbOps)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.TokenInvalid,
		})
		return
	}

	user, err := BindUserToCongregation(dto, dbOps)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}
	user.WithCongregation(dbInst)

	ctx.JSON(http.StatusAccepted, gin.H{"message": "Token matches"})
}

// Get the current authenticated user
func GetCurrentUser(ctx *gin.Context) {
	db, _ := ctx.MustGet("db").(*gorm.DB)
	// Get the first user that matches the ID
	tokenPayload, _ := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)

	var foundUser models.User
	queryResult := db.
		// Preload the congregation to ensure it's included in the user payload
		Preload("Congregation").
		First(&foundUser, "id = ?", tokenPayload.UserID)

	if queryResult.Error != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.AuthInvalid,
		})
		return
	}

	ctx.JSON(http.StatusOK, foundUser)
}

/**
 * Given an ADMIN user and congregation (which you need to verify), update the
 * congregation id foreign key of the admin to the required
 */
func BindAdminToCongregation(ctx *gin.Context) {
	var dto BindAdminToCongregationDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	tokenPayload, _ := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)

	var adminUser models.User
	result := db.First(&adminUser, "id = ?", tokenPayload.UserID)
	if result.Error != nil {
		fmt.Println("[BindAdminToCongregation]")
		fmt.Println(result.Error)
		ctx.JSON(http.StatusNotFound, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	// Update the adminUser congregation ID property to the congregation ID
	adminUser.CongregationID = &dto.CongregationID
	updateResult := db.Save(&adminUser)
	if updateResult.Error != nil {
		fmt.Println(updateResult.Error)
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	ctx.JSON(http.StatusOK, adminUser)
}
