package common

type JwAPIEndpoints struct {
	FindWeeklyMeetings string
}

var JwApiEndpointsInstance = JwAPIEndpoints{
	FindWeeklyMeetings: "https://apps.jw.org/api/public/meeting-search/weekly-meetings",
}
