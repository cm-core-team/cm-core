package main

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"backend/internal/routes"

	"os"

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

	r.Use(middleware.DatabaseSession(db))

	models.SetupModels(db)
	r = routes.SetupRoutes(r)

	r.Run("0.0.0.0:8080")
}
