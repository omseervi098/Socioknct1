import environment from "../config/environment.js";
import axios from "axios";
export const getWeather = async (req, res) => {
  try {
    const { lat, lon, city } = req.body;
    if (!lat || !lon) {
      if (!city) {
        return res.status(400).json({
          message: "Please provide city name",
        });
      } else {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.weatherApiKey}`
        );
        return res.status(200).json(response.data);
      }
    }
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
