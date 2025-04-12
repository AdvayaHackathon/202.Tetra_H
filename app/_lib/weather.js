export async function getWeather(lat, lon) {
  try {
    // In a real application, you would use an actual weather API
    // For now, we'll simulate weather data
    const mockWeather = {
      main: {
        temp: Math.floor(Math.random() * 30) + 10, // Random temperature between 10-40°C
        feels_like: Math.floor(Math.random() * 30) + 10,
        humidity: Math.floor(Math.random() * 100),
        pressure: Math.floor(Math.random() * 1000) + 900,
      },
      weather: [
        {
          description: ["Clear", "Cloudy", "Rainy", "Sunny", "Partly Cloudy"][
            Math.floor(Math.random() * 5)
          ],
        },
      ],
      wind: {
        speed: Math.floor(Math.random() * 20),
        deg: Math.floor(Math.random() * 360),
      },
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockWeather;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data");
  }
} 