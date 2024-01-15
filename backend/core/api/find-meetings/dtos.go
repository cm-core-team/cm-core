package findmeetings

type FindLocalMeetingsRequestDTO struct {
	Latitude  string `json:"latitude" validate:"required"`
	Longitude string `json:"longitude" validate:"required"`
}
