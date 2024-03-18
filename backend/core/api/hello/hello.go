package hello

import (
	"github.com/gin-gonic/gin"
)

func Hello(c *gin.Context) {
	/* Health check */

	c.JSON(200, gin.H{
		"message": "Hello world!",
	})
}
