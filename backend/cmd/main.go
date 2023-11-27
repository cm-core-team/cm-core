package main

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/internal/routes"
	"fmt"

	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load(".env.secret")
	DB_URL := os.Getenv("DB_URL")
	r := gin.Default()

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	fmt.Print("CORS: ")
	fmt.Println(os.Getenv("CORS_ALLOW_ORIGIN"))

	// Configuring CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{os.Getenv("CORS_ALLOW_ORIGIN")}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true

	r.Use(cors.New(config))
	r.Use(middleware.DatabaseSession(db))

	models.SetupModels(db)
	r = routes.SetupRoutes(r)

	r.Run("0.0.0.0:8080")
}
