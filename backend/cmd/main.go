package main

import (
	"net/http"

	"backend/internal/services"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	return r
}

func main() {
	// r := setupRouter()
	// // Listen and Server in 0.0.0.0:8080
	// r.Run("0.0.0.0:8080")
	services.Hello()
}
