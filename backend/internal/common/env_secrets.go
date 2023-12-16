package common

import "os"

type EnvSecrets struct {
	DbUrl           string
	CorsAllowOrigin string
	JwtSecret       string
	Environment     string
	JwAPIEndpoint   string
}

var EnvSecretsInstance = EnvSecrets{
	DbUrl:           os.Getenv("DB_URL"),
	CorsAllowOrigin: os.Getenv("CORS_ALLOW_ORIGIN"),
	JwtSecret:       os.Getenv("JWT_SECRET"),
	Environment:     os.Getenv("ENVIRONMENT"),
	JwAPIEndpoint:   os.Getenv("JW_API_ENDPOINT"),
}
