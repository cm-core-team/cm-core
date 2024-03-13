package main

import (
	"backend/core/common"
	"backend/core/db/models"
	"backend/core/middleware"
	"backend/core/routes"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	common.FindAndLoadDotenv(".env.secret")

	envSecrets := common.GetEnvSecrets()
	DB_URL := envSecrets.DbUrl
	r := gin.Default()

	fmt.Println("USING DB: ")
	fmt.Println(DB_URL)

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}
	models.SetupModels(db)

	// Configuring CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = envSecrets.CorsAllowOrigin
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true

	r.Use(cors.New(config))
	r.Use(middleware.DatabaseSession(db))

	r = routes.SetupRoutes(r)

	r.Run("0.0.0.0:8080")
}
