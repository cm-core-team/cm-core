package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUser(ctx *gin.Context) {
	/**
	 * Create a new user in the DB
	 */

	var dto services.CreateUserDTO

	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	user, err := services.CreateUserInDB(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, user)
}

func VerifyToken(ctx *gin.Context) {
	/**
	 * Verify that a user's token matches it's assigned token
	 */

	var dto services.JoinTokenMatchDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	err = services.VerifyToken(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = services.BindUserToCongregation(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Token matches"})
}
