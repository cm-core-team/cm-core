package user_test

import (
	"backend/core/api/user"
	"backend/core/db"
	"backend/core/db/models"
	"reflect"
	"testing"
)

func TestBindUserToCongregation(t *testing.T) {
	// Set up the mock database operations
	mockDBOps := new(db.MockDatabaseOps)

	// Define the input DTO
	dto := user.JoinTokenMatchDTO{
		JoinTokenValue: "valid-token",
		Email:          "user@example.com",
	}

	// Define the expected token and user
	congregationID := uint(1)
	mockToken := models.Token{CongregationID: congregationID}
	mockUser := models.User{ID: 1, Email: "user@example.com", CongregationID: &congregationID}

	// Set up the mock expectations
	mockDBOps.On("FindToken", dto.JoinTokenValue).Return(mockToken, nil)
	mockDBOps.On("FindAndUpdateUser", dto.Email, mockToken.CongregationID).Return(mockUser, nil)

	// Call the function to test
	user, err := user.BindUserToCongregation(dto, mockDBOps)

	// Assert the results
	if err != nil {
		t.Errorf("BindUserToCongregation returned an unexpected error: %v", err)
	}
	if !reflect.DeepEqual(user, mockUser) {
		t.Errorf("expected user: %+v, got: %+v", mockUser, user)
	}

	// Verify that the mock expectations were met
	mockDBOps.AssertExpectations(t)
}

func TestVerifyTokenMatch(t *testing.T) {
	mockDBOps := new(db.MockDatabaseOps)

	// Set up the expected user and token
	expectedUser := models.User{
		Email: "user@example.com",
		JoinToken: &models.Token{
			Value: "valid-token",
		},
	}

	// Test for correct token
	t.Run("Correct Token", func(t *testing.T) {
		mockDBOps.On("FindUserByEmailWithToken", "user@example.com").Return(expectedUser, nil)

		dto := user.JoinTokenMatchDTO{
			Email:          "user@example.com",
			JoinTokenValue: "valid-token",
		}
		err := user.VerifyTokenMatch(dto, mockDBOps)

		if err != nil {
			t.Errorf("VerifyTokenMatch returned an unexpected error: %v", err)
		}

		mockDBOps.AssertExpectations(t)
	})

	// Test for incorrect token
	t.Run("Incorrect Token", func(t *testing.T) {
		mockDBOps.On("FindUserByEmailWithToken", "user@example.com").Return(expectedUser, nil)

		dto := user.JoinTokenMatchDTO{
			Email:          "user@example.com",
			JoinTokenValue: "invalid-token",
		}
		err := user.VerifyTokenMatch(dto, mockDBOps)

		if err == nil {
			t.Errorf("VerifyTokenMatch expected an error, got nil")
		}

		mockDBOps.AssertExpectations(t)
	})
}
