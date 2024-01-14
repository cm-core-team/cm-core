package common

type UserErrors struct {
	UserErrKey string

	BadRequestOrData string
	AuthInvalid      string

	// Congregation
	FailedToCreateCongregation            string
	CongregationAlreadyExists             string
	CongregationNotFound                  string
	IncorrectCongregationVerificationCode string

	UserNotFound        string
	UserAlreadyExists   string
	UserPasswordInvalid string

	TokenInvalid string

	Unknown string
}

var UserErrorInstance = UserErrors{
	UserErrKey: "userMsg",

	BadRequestOrData: "Error on our side. Please report if this persists.",
	AuthInvalid:      "You are not authorized. Please check your credentials.",

	FailedToCreateCongregation:            "Could not create congregation, please try again later and report this error if it exists.",
	CongregationAlreadyExists:             "Congregation already exists!",
	CongregationNotFound:                  "Could not find provided congregation or ID.",
	IncorrectCongregationVerificationCode: "The congregation verification code is incorrect. Please check again.",

	UserNotFound:        "Cannot find user. Please check your information and try again.",
	UserAlreadyExists:   "User already exists. Please login using that email or enter a different one.",
	UserPasswordInvalid: "Your password is incorrect. Please check and try again.",

	TokenInvalid: "Invalid token provided. Please try again.",

	Unknown: "Unknown error. Please report this if the error persists.",
}
