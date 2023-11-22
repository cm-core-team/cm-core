package handlers

import (
	"backend/internal/common"
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
	fmt.Println(ctx.Request.Body)
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println("[CreateCongregation] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
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
