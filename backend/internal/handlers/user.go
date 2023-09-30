package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreateUser creates a new user
func CreateUser(ctx *gin.Context) {
	var userDto services.UserDTO

	err := ctx.BindJSON(&userDto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	user, err := services.CreateUserInDB(userDto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func VerifyUser(ctx *gin.Context) {
	/**
	 * TODO: Verify that a user's password hash matches the one in the DB
	 */
}
