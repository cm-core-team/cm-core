package main

import (
	"backend/internal/models"
	"fmt"
	"reflect"

	faker "github.com/go-faker/faker/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(postgres.Open("host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	// Clear database
	db.Migrator().DropTable(&models.User{})
	db.Migrator().DropTable(&models.Congregation{})

	models.SetupModels(db)

	for i := 0; i < 10; i++ {
		addressor, _ := faker.GetAddress().RealWorld(reflect.Value{})
		address := addressor.(faker.RealAddress)

		// Congregation needs to be created first because of foreign key constraint
		congregation := models.Congregation{
			Name:    address.State,
			Address: address.Address,
		}
		db.Create(&congregation)

		user := models.User{
			Name:           faker.Name(),
			PasswordHash:   faker.Password(),
			CongregationID: congregation.ID,
		}
		db.Create(&user)

		fmt.Println("Created:")
		fmt.Println("Congregation: ", congregation.ID)
		fmt.Println("User: ", user.ID)
		fmt.Println()
	}
}
