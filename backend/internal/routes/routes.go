package routes

import (
	"backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) *gin.Engine {
	base := r.Group("/api/v1")

	/* Endpoints */

	base.GET("/hello", handlers.Hello)

	// Meetings / Congregations
	base.GET("/meetings", handlers.FindLocalMeetings)

	// Users
	base.POST("/user/create", handlers.CreateUser)
	base.POST("/user/verify-token", handlers.VerifyToken)

	return r
}
