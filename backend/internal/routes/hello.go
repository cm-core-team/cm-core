package routes

import (
	"github.com/gin-gonic/gin"
)

func Hello(r *gin.Engine) {
	/* 'Hello' testing endpoint */

	r.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello, world!"})
	})
}
