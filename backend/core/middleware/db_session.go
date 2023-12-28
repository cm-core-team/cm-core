package middleware

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DatabaseSession(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("db", db)
		ctx.Next()
	}
}
