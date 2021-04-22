const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();
//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//set up handle bar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
//setup static deirectory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manoj",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "manoj",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide a adress item",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecastData,
          location: location,
          adress: req.query.adress,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "this is some helful text",
    title: "Help",
    name: "manoj",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error:",
    message: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "page doesnt exist",
  });
});
app.listen(3000, () => {
  console.log("server is up on 3000");
});
