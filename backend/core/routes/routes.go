package routes

import (
	"backend/internal/api/congregation"
	findmeetings "backend/internal/api/find-meetings"
	"backend/internal/api/hello"
	"backend/internal/api/token"
	"backend/internal/api/user"

	"backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) *gin.Engine {
	base := r.Group("/api/v1")

	/* Endpoints */

	base.GET("/hello", hello.Hello)

	// Meetings / Congregations
	base.POST("/congregation/create", congregation.CreateCongregation)
	base.DELETE("/congregation/delete", congregation.DeleteCongregation)

	base.POST("/meetings", findmeetings.FindLocalMeetings)
	base.POST("/congregation/send-verification-code", congregation.SendCongregationVerificationCode)
	base.POST("/congregation/verify-phone", congregation.VerifyCongregationPhone)

	// Users
	base.POST("/user/create", user.CreateUser)
	base.POST("/user/login", user.LoginUser)
	base.POST("/user/verify-token", user.VerifyToken)
	base.GET("/user/auth", middleware.Authenticate())

	// Tokens
	base.POST("/token/create", token.CreateToken)

	return r
}
