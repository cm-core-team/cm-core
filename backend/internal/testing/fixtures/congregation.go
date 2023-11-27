package fixtures

import (
	"backend/internal/models"

	"github.com/go-faker/faker/v4"
)

func GetRandomCongregation() models.Congregation {
	congregation := models.Congregation{
		Name:    faker.Name(),
		Address: faker.GetRealAddress().Address,
	}
	congregation.SetPhones([]models.CongregationPhone{
		{Ext: "+44", Phone: faker.Phonenumber()},
		{Ext: "+44", Phone: faker.Phonenumber()},
		{Ext: "+44", Phone: faker.Phonenumber()},
	})

	return congregation
}
