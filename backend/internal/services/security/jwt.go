package security

import (
	"errors"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

type SessionTokenPayload struct {
	jwt.StandardClaims
	ID string
}

func GenerateJWT(ID string) (string, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, SessionTokenPayload{
		ID: fmt.Sprint(ID),
	})
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWT(tokenString string) (*SessionTokenPayload, error) {
	token, err := jwt.ParseWithClaims(tokenString, &SessionTokenPayload{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("jwt token not valid")
	}

	return token.Claims.(*SessionTokenPayload), nil
}
