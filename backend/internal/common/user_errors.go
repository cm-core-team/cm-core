package common

type UserErrors struct {
	UserErrKey string

	BadRequestOrData string
	AuthInvalid      string

	FailedToCreateCongregation string
}

var UserErrorInstance = UserErrors{
	UserErrKey: "userMsg",

	BadRequestOrData: "Error on our side. Please report if this persists.",
	AuthInvalid:      "You are not authorized. Please check your credentials.",

	FailedToCreateCongregation: "Could not create congregation, please try again later and report this error if it exists.",
}
