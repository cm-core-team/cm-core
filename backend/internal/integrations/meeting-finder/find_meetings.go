package meetingfinder

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"

	"backend/internal/integrations/meeting-finder/dtos"
	"backend/internal/models"
)

type UserLocation struct {
	Latitude  string
	Longitude string
}

func FindLocalMeetings(location UserLocation, languageCode string) []models.Congregation {
	baseEndpoint := "https://apps.jw.org/api/public/meeting-search/weekly-meetings"
	urlObj, err := url.Parse(baseEndpoint)
	if err != nil {
		panic(err.Error())
	}

	// Add query parameters
	queryParams := urlObj.Query()
	queryParams.Add("includeSuggestions", "true")
	queryParams.Add("latitude", location.Latitude)
	queryParams.Add("longitude", location.Longitude)
	queryParams.Add("searchLanguageCode", languageCode)
	urlObj.RawQuery = queryParams.Encode()

	res, err := http.Get(urlObj.String())
	if err != nil {
		panic(err.Error())
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err.Error())
	}

	jsonContent := string(body)
	var meetings dtos.GeoLocationList
	json.Unmarshal([]byte(jsonContent), &meetings)

	// Convert DTOs to Congregation
	var congregations []models.Congregation
	for _, meeting := range meetings.Locations {
		congregations = append(congregations, models.Congregation{
			Name:    meeting.Properties.OrgName,
			Area:    meeting.Properties.OrgType,
			Address: meeting.Properties.Address,
			Users:   []models.User{}, // Empty until a user is added
		})
	}

	return congregations
}
