package models

import (
	"encoding/json"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type CongregationPhone struct {
	Ext   string `json:"ext"`
	Phone string `json:"phone"`
}

type Congregation struct {
	gorm.Model

	ID uint `json:"id" gorm:"primarykey"`

	Name    string `json:"name"`
	Address string `json:"address"`

	// Should not be modified/retrieved directly. Only through GetPhones/SetPhones
	PhoneNumbers datatypes.JSON `json:"phoneNumbers"`

	Users []User `json:"users" gorm:"foreignKey:CongregationID"`
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
