// Package config reads service settings from environment variables.
package config

import "os"

type Config struct {
	Port string
	Env  string
}

func Load() Config {
	return Config{
		Port: getenv("PORT", "8080"),
		Env:  getenv("APP_ENV", "development"),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
