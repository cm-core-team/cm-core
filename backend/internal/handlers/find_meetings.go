package handlers

import (
	meetingfinder "backend/internal/integrations/meeting-finder"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FindLocalMeetings(ctx *gin.Context) {
	latitude := ctx.Query("latitude")
	longitude := ctx.Query("longitude")

	congregations, err := meetingfinder.FindLocalMeetings(meetingfinder.UserLocation{
		Latitude:  latitude,
		Longitude: longitude,
	}, "E")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to find local meetings",
		})
		return
	}

	ctx.JSON(200, congregations)
}
