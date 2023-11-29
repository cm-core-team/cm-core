package middleware

import (
	"backend/internal/services/security"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthenticatePayload struct {
	SessionToken string `json:"sessionToken"`
}

func Authenticate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var sessionToken string

		cookie, err := ctx.Request.Cookie("sessionToken")
		if err != nil {
			// If no cookie, check the body for the session token
			var authPayload AuthenticatePayload
			err = ctx.BindJSON(&authPayload)

			if err != nil {
				// There was no cookie, nor sessionToken in the body
				fmt.Println("[-] No cookie, no sessionToken, or invalid request.")
				fmt.Println(err)
				jsonUnauthorized(ctx)
				return
			}

			// There was a session token in the body
			sessionToken = authPayload.SessionToken
		} else {
			sessionToken = cookie.Value
		}

		payload, err := security.VerifyJWT(sessionToken)
		if err != nil {
			fmt.Println("[-] Invalid session token")
			fmt.Println(err)
			jsonUnauthorized(ctx)
			return
		}

		ctx.Set("sessionToken", payload)

		// We don't want to run ctx.Next() if there's an auth error
		ctx.Next()
	}
}

func jsonUnauthorized(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{"userError": "You need to be logged in to access this resource."})
	ctx.Abort()
}
