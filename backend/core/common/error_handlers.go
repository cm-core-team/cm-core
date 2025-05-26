package common

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// Validate DTOs by Binding JSON body and validating with validator
func BindAndValidate(ctx *gin.Context, dto interface{}) error {
	if err := ctx.BindJSON(dto); err != nil {
		log.Println(err)
		return err
	}

	validate := validator.New()
	if err := validate.Struct(dto); err != nil {
		log.Println(err)
		return err
	}

	return nil
}
