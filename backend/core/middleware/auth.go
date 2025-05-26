package middleware

import (
	"backend/core/common"
	"backend/core/services/security"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthenticatePayload struct {
	SessionToken string `json:"sessionToken"`
}

func Authenticate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		sessionToken, err := GetSessionToken(ctx)
		if err != nil {
			jsonUnauthorized(ctx)
			return
		}

		payload, err := security.VerifyJWT(sessionToken)
		if err != nil {
			log.Println("[-] Invalid session token")
			log.Println(err)
			jsonUnauthorized(ctx)
			return
		}

		ctx.Set("sessionToken", &sessionToken)
		ctx.Set("jwtPayload", payload)

		// We don't want to run ctx.Next() if there's an auth error
		ctx.Next()
	}
}

// Get session token from the Gin context header
func GetSessionToken(ctx *gin.Context) (string, error) {
	if cookie, err := ctx.Request.Cookie("sessionToken"); err == nil {
		return cookie.Value, nil
	}

	// If no cookie, check the body for the session token
	sessionToken := ctx.GetHeader("Authorization")
	if sessionToken == "" {
		log.Println("[-] No session token in cookie or Authorization header.")
		return "", errors.New("no session token")
	}

	return sessionToken, nil
}

func jsonUnauthorized(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{
		common.UserErrorInstance.UserErrKey: common.UserErrorInstance.AuthInvalid,
	})
	ctx.Abort()
}
