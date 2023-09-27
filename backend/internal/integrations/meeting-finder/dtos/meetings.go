package dtos

// The payload response DTOs
type MeetingProperties struct {
	OrgName string `json:"orgName"`
	OrgType string `json:"orgType"`
	Address string `json:"address"`
}

type GeoLocation struct {
	GeoID      string            `json:"geoId"`
	Type       string            `json:"type"`
	IsPrimary  bool              `json:"isPrimary"`
	Properties MeetingProperties `json:"properties"`
}

type GeoLocationList struct {
	Locations []GeoLocation `json:"geoLocationList"`
}
