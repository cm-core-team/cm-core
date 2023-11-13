package dtos

// The payload response DTOs
type MeetingPhone struct {
	Ext   string `json:"ext"`
	Phone string `json:"phone"`
}

type MeetingProperties struct {
	OrgName string         `json:"orgName"`
	OrgType string         `json:"orgType"`
	Address string         `json:"address"`
	Phones  []MeetingPhone `json:"phones"`
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
