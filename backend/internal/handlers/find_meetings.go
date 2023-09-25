package handlers

import (
	meetingfinder "backend/internal/integrations/meeting-finder"

	"github.com/gin-gonic/gin"
)

func FindLocalMeetings(c *gin.Context) {
	latitude := c.Query("latitude")
	longitude := c.Query("longitude")

	congregations := meetingfinder.FindLocalMeetings(meetingfinder.UserLocation{
		Latitude:  latitude,
		Longitude: longitude,
	}, "E")

	c.JSON(200, congregations)
}
