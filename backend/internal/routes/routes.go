package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// Endpoints here
	Hello(r)

	return r
}
