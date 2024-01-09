package routes

import (
	"backend/core/api/congregation"
	findmeetings "backend/core/api/find-meetings"
	"backend/core/api/hello"
	"backend/core/api/token"
	"backend/core/api/user"

	"backend/core/middleware"

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
	base.GET("/user/me", middleware.Authenticate(), user.GetCurrentUser)
	base.POST("/user/bind", middleware.Authenticate(), user.BindAdminToCongregation)
	base.DELETE("/user/logout", middleware.Authenticate(), user.LogoutUser)

	// Tokens
	base.POST("/token/create", middleware.Authenticate(), token.CreateToken)

	return r
}
