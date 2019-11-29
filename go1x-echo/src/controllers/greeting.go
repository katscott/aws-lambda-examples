package controllers

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/labstack/echo/v4"
  )

func GetGreeting(c echo.Context) error {
	result := map[string]interface{}{
		"message": "Greetings!",
	}
	
	return c.JSON(http.StatusOK, result)
}


func GetGreetingNamed(c echo.Context) error {
	nameParam := c.Param("name")

	name, err := url.QueryUnescape(nameParam)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"message": err,
		})
	}

	message := fmt.Sprintf("Greetings %s!", name)

	result := map[string]interface{}{
		"message": message,
	}
	
	return c.JSON(http.StatusOK, result)
}