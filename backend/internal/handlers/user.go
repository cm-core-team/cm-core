package handlers

import (
	"backend/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UserDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// CreateUser creates a new user
func CreateUser(c *gin.Context) {
	var userDto UserDTO

	err := c.BindJSON(&userDto)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash user password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userDto.Password), 8)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Remove password from response
	userDto.Password = ""

	// Create user
	user := models.User{
		Email:        userDto.Email,
		PasswordHash: string(hashedPassword),
	}

	c.JSON(http.StatusOK, user)
}
