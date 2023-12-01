package handlers

import (
	"github.com/gin-gonic/gin"
)

func Hello(c *gin.Context) {
	/* Hello world endpoint */

	c.JSON(200, gin.H{
		"message": "Hello world!",
	})
}
