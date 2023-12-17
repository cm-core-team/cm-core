package security

import (
	"errors"
	"fmt"

	"backend/internal/common"

	"github.com/golang-jwt/jwt"
)

type SessionTokenPayload struct {
	jwt.StandardClaims
	ID string
}

func GenerateJWT(ID string) (string, error) {
	jwtSecret := []byte(common.GetEnvSecrets().JwtSecret)
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
		return []byte(common.GetEnvSecrets().JwtSecret), nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("jwt token not valid")
	}

	return token.Claims.(*SessionTokenPayload), nil
}
