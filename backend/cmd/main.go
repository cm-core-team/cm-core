package main

import (
	"backend/core/common"
	"backend/core/db/models"
	"backend/core/middleware"
	"backend/core/routes"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	common.FindAndLoadDotenv(".env.secret")

	envSecrets := common.GetEnvSecrets()
	DB_URL := envSecrets.DbUrl
	r := gin.Default()

	log.Println("USING DB: ")
	log.Println(DB_URL)

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}
	models.SetupModels(db)

	// Configuring CORS
	allowedOriginsMap := make(map[string]bool)
	for _, origin := range envSecrets.CorsAllowOrigins {
		allowedOriginsMap[origin] = true
	}

	// Custom CORS middleware
	r.Use(func(c *gin.Context) {
		origin := c.GetHeader("Origin")

		// Check if origin is explicitly allowed or contains "cm-core"
		if _, ok := allowedOriginsMap[origin]; ok || strings.Contains(origin, "cm-core") {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Length, Content-Type, Authorization")
			c.Header("Access-Control-Allow-Credentials", "true")
		}

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.Use(middleware.DatabaseSession(db))

	r = routes.SetupRoutes(r)

	r.Run("0.0.0.0:8080")
}
