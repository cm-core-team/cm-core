package findmeetings

import (
	"backend/core/common"
	meetingfinder "backend/core/integrations/meeting-finder"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FindLocalMeetings(ctx *gin.Context) {
	var dto FindLocalMeetingsRequestDTO

	err := common.BindAndValidate(ctx, &dto)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	congregations, err := meetingfinder.FindLocalMeetings(meetingfinder.UserLocation{
		Latitude:  dto.Latitude,
		Longitude: dto.Longitude,
	}, "E")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to find local meetings",
		})
		return
	}

	ctx.JSON(200, congregations)
}
