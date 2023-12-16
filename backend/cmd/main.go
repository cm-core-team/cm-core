package main

import (
	"backend/internal/common"
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/internal/routes"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load(".env.secret")
	DB_URL := common.EnvSecretsInstance.DbUrl
	r := gin.Default()

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	fmt.Print("CORS: ")
	fmt.Println(common.EnvSecretsInstance.CorsAllowOrigin)

	// Configuring CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{common.EnvSecretsInstance.CorsAllowOrigin}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true

	r.Use(cors.New(config))
	r.Use(middleware.DatabaseSession(db))

	models.SetupModels(db)
	r = routes.SetupRoutes(r)

	r.Run("0.0.0.0:8080")
}
