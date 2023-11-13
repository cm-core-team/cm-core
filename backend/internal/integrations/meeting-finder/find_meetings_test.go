package meetingfinder_test

import (
	meetingfinder "backend/internal/integrations/meeting-finder"
	"fmt"
	"testing"
)

func TestFindLocalMeetings(t *testing.T) {
	meetings := meetingfinder.FindLocalMeetings(meetingfinder.UserLocation{
		Latitude:  "40.7128",
		Longitude: "74.0060",
	}, "E")

	if len(meetings) == 0 {
		t.Error("Expected to find meetings")
	}

	if meetings[0].Name == "" {
		t.Error("Expected to find congregation name")
	}

	if meetings[0].Area == "" {
		t.Error("Expected to find congregation area")
	}

	if meetings[0].Address == "" {
		t.Error("Expected to find congregation address")
	}

	if len(meetings[0].Users) != 0 {
		t.Error("Expected to find no users")
	}

	fmt.Println(meetings)
}
