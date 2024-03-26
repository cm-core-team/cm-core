package common

import (
	"github.com/nedpals/supabase-go"
)

func GetSupabaseClient() *supabase.Client {
	client := supabase.CreateClient(
		GetEnvSecrets().SupabaseUrl,
		GetEnvSecrets().SupabaseKey,
	)

	return client
}
