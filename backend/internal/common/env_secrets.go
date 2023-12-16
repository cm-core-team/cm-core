package common

import (
	"os"
)

type EnvSecrets struct {
	DbUrl                   string
	CorsAllowOrigin         string
	JwtSecret               string
	Environment             string
	GetWeeklyMeetings_JwAPI string
}

var EnvSecretsInstance = EnvSecrets{
	DbUrl:                   os.Getenv("DB_URL"),
	CorsAllowOrigin:         os.Getenv("CORS_ALLOW_ORIGIN"),
	JwtSecret:               os.Getenv("JWT_SECRET"),
	Environment:             os.Getenv("ENVIRONMENT"),
	GetWeeklyMeetings_JwAPI: os.Getenv("GET_WEEKLY_MEETINGS_JW_API"),
}
