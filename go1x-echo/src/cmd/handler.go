package main

import (
  "fmt"
  "net/http"
  "os"

  "github.com/apex/gateway"
  "github.com/labstack/echo/v4"
  echomw "github.com/labstack/echo/v4/middleware"

  "handler/controllers"
)

func main() {
  e := echo.New()

  e.Use(echomw.Logger())
  e.Use(echomw.Recover())

  e.GET("/health", health)

  urlPrefix := getEnv("API_URL_PREFIX", "greet")
  groupPath := fmt.Sprintf("/%s", urlPrefix)

  g := e.Group(groupPath)
  g.GET("", controllers.GetGreeting)
  g.GET("/:name", controllers.GetGreetingNamed)

  gateway.ListenAndServe(":3000", e)
}

func health(c echo.Context) error {
  return c.String(http.StatusOK, "OK")
}

func getEnv(key, fallback string) string {
  if value, ok := os.LookupEnv(key); ok {
      return value
  }
  return fallback
}