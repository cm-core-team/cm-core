package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) *gin.Engine {
	base := r.Group("/api/v1")

	/* Endpoints */

	base.GET("/hello", handlers.Hello)

	// Meetings / Congregations
	base.POST("/congregation/create", handlers.CreateCongregation)
	base.DELETE("/congregation/delete", handlers.DeleteCongregation)

	base.POST("/meetings", handlers.FindLocalMeetings)
	base.POST("/congregation/send-verification-code", handlers.SendCongregationVerificationCode)
	base.POST("/congregation/verify-phone", handlers.VerifyCongregationPhone)

	// Users
	base.POST("/user/create", handlers.CreateUser)
	base.POST("/user/login", handlers.LoginUser)
	base.POST("/user/verify-token", handlers.VerifyToken)
	base.GET("/user/me", middleware.Authenticate(), handlers.GetCurrentUser)

	// Tokens
	base.POST("/token/create", handlers.CreateToken)

	return r
}
