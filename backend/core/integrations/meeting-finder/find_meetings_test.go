package meetingfinder_test

import (
	meetingfinder "backend/core/integrations/meeting-finder"
	"testing"
)

func TestFindLocalMeetings(t *testing.T) {
	meetings, err := meetingfinder.FindLocalMeetings(meetingfinder.UserLocation{
		Latitude:  "51.5152544",
		Longitude: "-0.6365793",
	}, "E")

	if err != nil {
		t.Error(err)
	}

	if len(meetings) == 0 {
		t.Error("Expected to find meetings")
	}

	if meetings[0].Name == "" {
		t.Error("Expected to find congregation name")
	}

	if meetings[0].Address == "" {
		t.Error("Expected to find congregation address")
	}

	if len(meetings[0].Users) != 0 {
		t.Error("Expected to find no users")
	}

	if meetings[0].Lat == "" {
		t.Error("Latitude is not found")
	}

	if meetings[0].Lon == "" {
		t.Error("Longitude is not found")
	}
}
