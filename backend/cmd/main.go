package main

import "backend/internal/routes"

func main() {
	r := routes.SetupRoutes()
	r.Run("0.0.0.0:8080")
}
