package routes

import (
	"backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// Endpoints here
	r.GET("/api/v1/hello", handlers.Hello)
	r.GET("/api/v1/meetings", handlers.FindLocalMeetings)

	return r
}
