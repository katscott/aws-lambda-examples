package main

import (
        "context"
        "encoding/json"
        "fmt"
        "os"
        "strings"

	"github.com/aws/aws-lambda-go/lambda"
)

type GreetingsEvent struct {
	Name string `json:"name"`
}

func getEnv(key, fallback string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		value = fallback
	}
	return value
}

func HandleRequest(ctx context.Context, event GreetingsEvent) (map[string]interface{}, error) {
	message := "Greetings!"

	if event.Name != "" {
		message = "Greetings " + event.Name + "!"
	}

	debug_env := getEnv("DEBUG", "false")
	debug := strings.ToLower(debug_env) == "true"

	if debug {
                eventJson, _ := json.Marshal(event)
		fmt.Println(string(eventJson))
	}

	return map[string]interface{}{
		"message": message,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
