const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 7000;

const init = async () => {
  try {
    app.get("/", (req, res) => {
      try {
        res.render("search-address");
      } catch (error) {
        throw error
      }
    });

    app.post("/weather", async (req, res) => {
      try {
        let address= req.body.location;
        // console.log(".............>>>", address);
        let mapUrl = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.MAP_APIKEY}`;

        const  mapApiResponse =await axios.get(mapUrl);
        // console.log(mapApiResponse.data[0]);
        
        let lat = mapApiResponse.data[0].lat;
        let lon = mapApiResponse.data[0].lon;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APIKEY}`;
        let response = await axios.get(url);
        let responseData = response.data;
        // console.log(responseData);
        res.render("weather", responseData);
        // return res.status(200).json(responseData);
      } catch (error) {
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
