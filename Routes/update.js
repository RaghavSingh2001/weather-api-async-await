const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const fetch = require("node-fetch");
require("dotenv/config");
const cities = require("../cities");

router.patch("/", async (req, res) => {
  await updateData();
  res.send("Data updated.");
});

async function getWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data.main.temp;
  } catch (err) {
    console.log(err);
  }
}

function updateData() {
  cities.forEach(async (place) => {
    try {
      let data = await getWeather(place);
      Post.updateOne(
        { City: place },
        {
          $set: {
            Temp: data,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = router;
