const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWFub2o2NiIsImEiOiJja25qOXNhY3QzaHBpMnZ0YWhxdzNqd3JyIn0.NwOzR-HcU4oN4NN-k8IzpA";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect ot the location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location.try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
