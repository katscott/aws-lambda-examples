package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHandleRequest(t *testing.T) {
	assert := assert.New(t)

	testName := "Eddie"

	mockEvent := GreetingsEvent{
		Name: testName,
	}

	result, err := HandleRequest(nil, mockEvent)

	assert.Equal(err, nil, "There should be no error")
	assert.Equal(result["message"], fmt.sprintf("Greetings {name}!", testName), "The response should match")
}

func TestHandleRequestNoName(t *testing.T) {
	assert := assert.New(t)

	mockEvent := GreetingsEvent{}

	result, err := HandleRequest(nil, mockEvent)

	assert.Equal(err, nil, "There should be no error")
	assert.Equal(result["message"], "Greetings!", "The response should match")
}
