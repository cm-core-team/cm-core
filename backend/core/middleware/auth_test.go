package middleware_test

import (
	"backend/core/middleware"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetSessionToken(t *testing.T) {
	// Test handling cookie version
	t.Run("Cookie Version", func(t *testing.T) {
		ctx, _ := gin.CreateTestContext(nil)
		ctx.Request = &http.Request{Header: http.Header{}}
		ctx.Request.AddCookie(&http.Cookie{Name: "sessionToken", Value: "cookieToken"})

		token, err := middleware.GetSessionToken(ctx)
		assert.NoError(t, err)
		assert.Equal(t, "cookieToken", token)
	})

	// Test handling Auth header version
	t.Run("Auth Header Version", func(t *testing.T) {
		ctx, _ := gin.CreateTestContext(nil)
		ctx.Request = &http.Request{Header: http.Header{}}
		ctx.Request.Header.Add("Authorization", "headerToken")

		token, err := middleware.GetSessionToken(ctx)
		assert.NoError(t, err)
		assert.Equal(t, "headerToken", token)
	})

	// Test handling no session token
	t.Run("No Session Token", func(t *testing.T) {
		ctx, _ := gin.CreateTestContext(nil)
		ctx.Request = &http.Request{Header: http.Header{}}

		token, err := middleware.GetSessionToken(ctx)
		assert.Error(t, err)
		assert.Equal(t, "no session token", err.Error())
		assert.Equal(t, "", token)
	})
}
