const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1e18b756e0dd8e9c38c321ea083ab11a&query=${lat},${long}&unit=m`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (response.body.error) {
      callback("unable to fetch response,check url", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        humidity: response.body.current.humidity,
        feelslike: response.body.current.feelslike,
      });
    }
  });
};
module.exports = forecast;
