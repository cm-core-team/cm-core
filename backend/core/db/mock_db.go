package db

import (
	"backend/core/db/models"

	"github.com/stretchr/testify/mock"
)

type MockDatabaseOps struct {
	mock.Mock
}

func (m *MockDatabaseOps) FindToken(value string) (models.Token, error) {
	args := m.Called(value)
	return args.Get(0).(models.Token), args.Error(1)
}

func (m *MockDatabaseOps) FindAndUpdateUser(email string, congregationID uint) (models.User, error) {
	args := m.Called(email, congregationID)
	return args.Get(0).(models.User), args.Error(1)
}

func (m *MockDatabaseOps) FindUserByEmailWithToken(email string) (models.User, error) {
	args := m.Called(email)
	return args.Get(0).(models.User), args.Error(1)
}

func (m *MockDatabaseOps) FindVerificationCodeWithSignature(signature string) (models.CongregationVerificationCode, error) {
	args := m.Called(signature)
	return args.Get(0).(models.CongregationVerificationCode), args.Error(1)
}
