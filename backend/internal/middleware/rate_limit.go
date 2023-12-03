package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	limiter "github.com/ulule/limiter/v3"
	mgin "github.com/ulule/limiter/v3/drivers/middleware/gin"
	sredis "github.com/ulule/limiter/v3/drivers/store/redis"
)

func CreateRateLimitStore() limiter.Store {

	// Create the redis client to store rate config
	option, err := redis.ParseURL("redis://localhost:6379/0")
	if err != nil {
		fmt.Println(err)
	}

	redis_client := redis.NewClient(option)

	// Create a store with the redis client
	store, err := sredis.NewStoreWithOptions(redis_client, limiter.StoreOptions{
		Prefix:   "limiter",
		MaxRetry: 3,
	})

	if err != nil {
		fmt.Println(err)
	}

	return store
}

func RateLimit() gin.HandlerFunc {
	rate, err := limiter.NewRateFromFormatted("1000-H")

	if err != nil {
		fmt.Println(err)
	}

	limit_config_store := CreateRateLimitStore()

	middleware := mgin.NewMiddleware(limiter.New(limit_config_store, rate))

	return middleware
}
