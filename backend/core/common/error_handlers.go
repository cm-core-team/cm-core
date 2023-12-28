/* TODO */

package common

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ContextErrorHandle struct {
	Context *gin.Context
	Tag     string
}

func (handle ContextErrorHandle) RequestValidation(err error) {
	if err != nil {
		handle.Context.JSON(http.StatusBadRequest, gin.H{
			UserErrorInstance.UserErrKey: UserErrorInstance.BadRequestOrData,
		})
		return
	}
}
