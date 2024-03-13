package common

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
)

type EnvSecrets struct {
	DbUrl                   string
	CorsAllowOrigin         []string
	JwtSecret               string
	Environment             string
	GetWeeklyMeetings_JwAPI string
	GeocodingAPIKey         string
}

func GetEnvSecrets() EnvSecrets {
	return EnvSecrets{
		DbUrl:                   os.Getenv("DB_URL"),
		CorsAllowOrigin:         strings.Split(os.Getenv("CORS_ALLOW_ORIGIN"), " "),
		JwtSecret:               os.Getenv("JWT_SECRET"),
		Environment:             os.Getenv("ENVIRONMENT"),
		GetWeeklyMeetings_JwAPI: os.Getenv("GET_WEEKLY_MEETINGS_JW_API"),
		GeocodingAPIKey:         os.Getenv("GEOCODING_API_KEY"),
	}
}

func FindAndLoadDotenv(name string) error {
	currentDir, err := os.Getwd()
	if err != nil {
		return err
	}

	for {
		found, err := findAndLoadInDir(name, currentDir)
		if err != nil {
			return err
		}
		if found {
			break
		}

		// Move up one directory
		currentDir = filepath.Dir(currentDir)

		// Stop if we reach the root directory
		if currentDir == "/" || currentDir == "." {
			break
		}
	}

	return nil
}

func findAndLoadInDir(name, dir string) (bool, error) {
	var found bool
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(filepath.Base(path), name) {
			if err := godotenv.Load(path); err != nil {
				return err
			}
			found = true
		}

		return nil
	})

	return found, err
}
