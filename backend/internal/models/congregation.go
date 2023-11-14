package models

import (
	"encoding/json"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type CongregationPhone struct {
	Ext   string
	Phone string
}

type Congregation struct {
	gorm.Model

	Name    string
	Area    string
	Address string

	// Should not be modified/retrieved directly. Only through get/setters
	PhoneNumbers datatypes.JSON

	Users []User `gorm:"foreignKey:CongregationID"`
}

func (congregation *Congregation) SetPhones(phones []CongregationPhone) error {
	bytes, err := json.Marshal(phones)
	if err != nil {
		return err
	}

	congregation.PhoneNumbers = datatypes.JSON(bytes)
	return nil
}

func (congregation *Congregation) GetPhones() ([]CongregationPhone, error) {
	var phones []CongregationPhone
	err := json.Unmarshal(congregation.PhoneNumbers, &phones)

	return phones, err
}
