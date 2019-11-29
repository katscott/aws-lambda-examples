package controllers

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestGreeting(t *testing.T) {
	assert := assert.New(t)

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/greet", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/")

	if assert.NoError(GetGreeting(c)) {
		assert.Equal("{\"message\":\"Greetings!\"}\n", rec.Body.String(), "The response should match")
	}
}

func TestGreetingNamed(t *testing.T) {
	assert := assert.New(t)

	testName := "Great Green Arkleseizure"
	testNameEncoded := url.QueryEscape(testName)

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/greet", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/")
	c.SetParamNames("name")
	c.SetParamValues(testNameEncoded)

	expected := fmt.Sprintf("{\"message\":\"Greetings %s!\"}\n", testName)

	if assert.NoError(GetGreetingNamed(c)) {
		assert.Equal(expected, rec.Body.String(), "The response should match")
	}
}