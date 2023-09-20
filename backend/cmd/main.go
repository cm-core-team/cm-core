package main

import (
	"backend/internal/routes"
	"os"

	"github.com/joho/godotenv"
)

var DB_URL = os.Getenv("DB_URL")

func main() {
	godotenv.Load(".env.secret")

	r := routes.SetupRoutes()
	r.Run("0.0.0.0:8080")

}
