package main

import (
	"backend/internal/models"
	"backend/internal/routes"

	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load(".env.secret")
	DB_URL := os.Getenv("DB_URL")

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	models.SetupModels(db)

	r := routes.SetupRoutes()
	r.Run("0.0.0.0:8080")
}
