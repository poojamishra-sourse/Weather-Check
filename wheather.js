// Node.js v18+ me fetch built-in hota hai
// Agar purana version hai to: npm install node-fetch

const api_key = "14423460ed394e7198880024242312";
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the city name: ", async (city) => {

  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;
  console.log("URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      const temp = data.current.temp_c;
      const location = data.location.name;
      const region = data.location.region;
      const country = data.location.country;
      const wind = data.current.wind_kph;
      const weather_desc = data.current.condition.text;

      console.log(`\n--- ${city.toUpperCase()} WEATHER ---`);
      console.log(`Temperature: ${temp}°C`);
      console.log(`Description: ${weather_desc}`);
      console.log(`Location: ${location}`);
      console.log(`Wind Speed: ${wind} kph`);
      console.log(`Region: ${region}`);
      console.log(`Country: ${country}`);
    } else {
      console.log("Error:", data);
    }

    // ---------------- FORECAST ----------------
    rl.question("\nDo you want 3-day forecast? (yes/no): ", async (choice) => {

      if (choice.toLowerCase() === "yes") {

        const forecast_url = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=3`;
        console.log("Forecast URL:", forecast_url);

        const forecastResponse = await fetch(forecast_url);
        const forecastData = await forecastResponse.json();

        if (forecastData.forecast) {
          console.log(`\n--- ${city.toUpperCase()} 3-DAY FORECAST ---`);

          forecastData.forecast.forecastday.forEach(day => {
            console.log("\nDate:", day.date);
            console.log("Max Temp:", day.day.maxtemp_c, "°C");
            console.log("Min Temp:", day.day.mintemp_c, "°C");
            console.log("Condition:", day.day.condition.text);
          });
        } else {
          console.log("Forecast data not found");
        }
      }

      // ---------------- FUTURE ----------------
      rl.question("\nDo you want future forecast? (yes/no): ", async (future) => {

        if (future.toLowerCase() === "yes") {

          const future_url = `http://api.weatherapi.com/v1/future.json?key=${api_key}&q=${city}&days=7`;
          console.log("Future URL:", future_url);

          const futureResponse = await fetch(future_url);
          const futureData = await futureResponse.json();

          if (futureData.forecast) {
            console.log(`\n--- ${city.toUpperCase()} FUTURE 7-DAY FORECAST ---`);

            futureData.forecast.forecastday.forEach(day => {
              console.log("\nDate:", day.date);
              console.log("Max Temp:", day.day.maxtemp_c, "°C");
              console.log("Min Temp:", day.day.mintemp_c, "°C");
              console.log("Condition:", day.day.condition.text);
            });
          } else {
            console.log("Future forecast data not found");
          }
        }

        rl.close();
      });

    });

  } catch (error) {
    console.log("Error:", error.message);
    rl.close();
  }

});