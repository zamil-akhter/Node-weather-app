const express = require("express");
const axios = require("axios");
const utils = require('./src/utils/utils');
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 7000;

const init = async () => {
  try {
    app.get("/", (req, res) => {
      res.render("search-address");
    });

    app.post("/weather", async (req, res) => {
      try {
        let address = req.body.location;
        // console.log(".............>>>", address);
       
        const { lat, lon } = await utils.getGeolocation(address);
        
        const weatherData = await utils.getWeatherData(lat, lon);
        // console.log(weatherData);

        res.render("weather", weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    throw error;
  }
};
init();
