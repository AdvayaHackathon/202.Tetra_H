'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const MyMap = dynamic(() => import("../../_components/MyMap"), { ssr: false });

export default function MyClientComponent() {
  const [loaded, setLoaded] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [placeType, setPlaceType] = useState(null);

  const params = useParams(); 
  const slug = decodeURIComponent(params.slug);

  // Function to determine place type based on slug/name
  const getPlaceType = (placeName) => {
    const outdoorPlaces = ['pyramid', 'giza', 'beach', 'mountain', 'park', 'garden', 'desert'];
    const indoorPlaces = ['museum', 'gallery', 'palace', 'castle', 'temple', 'church', 'mosque'];
    
    const name = placeName.toLowerCase();
    if (outdoorPlaces.some(place => name.includes(place))) return 'outdoor';
    if (indoorPlaces.some(place => name.includes(place))) return 'indoor';
    return 'general';
  };

  // Function to get unsuitable temperature range based on place type and name
  const getUnsuitableTemps = (placeName) => {
    const name = placeName.toLowerCase();
    
    // Desert and outdoor historical sites
    if (name.includes('pyramid') || name.includes('giza') || name.includes('desert')) {
      return { min: 35, max: 45 }; // Very hot temperatures
    }
    
    // Beaches and coastal areas
    if (name.includes('beach') || name.includes('coast')) {
      return { min: 10, max: 35 }; // Moderate temperatures preferred
    }
    
    // Mountains and high-altitude places
    if (name.includes('mountain') || name.includes('peak')) {
      return { min: -10, max: 25 }; // Cooler temperatures
    }
    
    // Indoor historical sites and museums
    if (name.includes('museum') || name.includes('gallery') || 
        name.includes('palace') || name.includes('castle')) {
      return { min: 5, max: 30 }; // Comfortable indoor temperatures
    }
    
    // Religious sites and temples
    if (name.includes('temple') || name.includes('church') || 
        name.includes('mosque') || name.includes('cathedral')) {
      return { min: 10, max: 35 }; // Moderate temperatures
    }
    
    // Default for other places
    return { min: 10, max: 35 };
  };

  // Function to get weather recommendation based on temperature
  const getWeatherRecommendation = (temp, placeName) => {
    const unsuitableTemps = getUnsuitableTemps(placeName);
    const placeType = getPlaceType(placeName);
    
    if (temp >= unsuitableTemps.max) {
      return {
        warning: true,
        message: `The temperature (${temp}°C) is too high for visiting ${placeName}. Consider visiting during cooler hours or choosing a different time of year.`
      };
    }
    
    if (temp <= unsuitableTemps.min) {
      return {
        warning: true,
        message: `The temperature (${temp}°C) is too low for visiting ${placeName}. Consider visiting during warmer hours or choosing a different time of year.`
      };
    }
    
    if (Math.abs(temp - unsuitableTemps.max) <= 5 || Math.abs(temp - unsuitableTemps.min) <= 5) {
      return {
        warning: true,
        message: `The temperature (${temp}°C) is approaching unsuitable conditions for ${placeName}. Consider planning your visit accordingly.`
      };
    }
    
    return {
      warning: false,
      message: `The current temperature (${temp}°C) is suitable for visiting ${placeName}.`
    };
  };

  useEffect(() => {
    // Fetch location data
    fetch(`${process.env.NEXT_PUBLIC_OSM_API_URL}?q=${encodeURIComponent(slug)}&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          const newLat = data[0].lat;
          const newLon = data[0].lon;
          setLat(newLat);
          setLon(newLon);
          setPlaceType(getPlaceType(slug));
          setLoaded(true);

          // Fetch weather data after getting coordinates
          setWeatherLoading(true);
          // Using a free weather API that doesn't require authentication
          fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}?latitude=${newLat}&longitude=${newLon}&current_weather=true`)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Weather API responded with status: ${res.status}`);
              }
              return res.json();
            })
            .then(weatherData => {
              if (weatherData && weatherData.current_weather) {
                // Transform the data to match our expected format
                setWeather({
                  main: { 
                    temp: weatherData.current_weather.temperature 
                  },
                  weather: [{ 
                    description: weatherData.current_weather.weathercode === 0 ? 'clear sky' : 
                               weatherData.current_weather.weathercode < 3 ? 'partly cloudy' :
                               weatherData.current_weather.weathercode < 5 ? 'cloudy' :
                               weatherData.current_weather.weathercode < 7 ? 'foggy' :
                               weatherData.current_weather.weathercode < 10 ? 'rainy' :
                               weatherData.current_weather.weathercode < 13 ? 'snowy' :
                               'thunderstorm'
                  }]
                });
              } else {
                console.error('Invalid weather data received:', weatherData);
                // Set default weather data for testing
                setWeather({
                  main: { temp: 25 },
                  weather: [{ description: 'clear sky' }]
                });
              }
              setWeatherLoading(false);
            })
            .catch(err => {
              console.error('Error fetching weather:', err);
              // Set default weather data for testing
              setWeather({
                main: { temp: 25 },
                weather: [{ description: 'clear sky' }]
              });
              setWeatherLoading(false);
            });

          // Fetch nearby places
          const body = `
            [out:json][timeout:25];
            (
              node["tourism"="hotel"](around:1000,${newLat},${newLon});
              node["amenity"="restaurant"](around:1000,${newLat},${newLon});
              node["amenity"="cafe"](around:1000,${newLat},${newLon});
            );
            out body;
            >;
            out skel qt;
          `;

          fetch(process.env.NEXT_PUBLIC_OVERPASS_API_URL, {
            method: "POST",
            body
          })
            .then(res => res.json())
            .then(placesData => {
              setHotelList(placesData.elements);
            })
            .catch(err => {
              console.error('Error fetching nearby places:', err);
            });
        }
      })
      .catch(err => {
        console.error('Error fetching location data:', err);
      });
  }, [slug]); // Only depend on slug

  function showHotel(hotel) {
    setSelectedHotel(hotel);
  }

  const showHotelList = hotelList.map((hotel) => (
    <div 
      onClick={() => showHotel(hotel)} 
      className={`bg-white border-2 rounded-lg mb-3 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-orange-400 ${
        selectedHotel?.id === hotel.id ? 'border-orange-400 shadow-lg' : 'border-gray-200'
      }`} 
      key={hotel.id}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{hotel.tags.name || 'Unnamed Location'}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {hotel.tags.tourism === 'hotel' ? 'Hotel' : 
             hotel.tags.amenity === 'restaurant' ? 'Restaurant' : 
             hotel.tags.amenity === 'cafe' ? 'Cafe' : 'Other'}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          {hotel.tags.website ? (
            <a 
              href={hotel.tags.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Website
            </a>
          ) : null}
        </div>
      </div>
      {hotel.tags.phone && (
        <p className="text-sm text-gray-600 mt-2">
          📞 {hotel.tags.phone}
        </p>
      )}
    </div>
  ));

  return (
    <div className="relative h-[100dvh] w-screen bg-gray-50">
      <div className="absolute left-4 top-4 bottom-4 w-80 bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Nearby Places</h2>
        {weatherLoading ? (
          <div className="mb-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Loading weather information...</p>
          </div>
        ) : weather && weather.main && weather.weather ? (
          <div className="mb-4 p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Current Weather</h3>
                <p className="text-sm text-gray-600">
                  {weather.main.temp}°C • {weather.weather[0].description}
                </p>
              </div>
            </div>
            {(() => {
              const recommendation = getWeatherRecommendation(weather.main.temp, slug);
              return (
                <div className={`mt-2 p-2 rounded ${recommendation.warning ? 'bg-red-50' : 'bg-green-50'}`}>
                  <p className={`text-sm ${recommendation.warning ? 'text-red-600' : 'text-green-600'}`}>
                    {recommendation.message}
                  </p>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="mb-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Weather information unavailable</p>
          </div>
        )}
        {loaded ? showHotelList : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading places...</div>
          </div>
        )}
      </div>
      {loaded ? (
        <div className="fixed right-0 w-[calc(100%-20rem)] h-full">
          <MyMap 
            position={[lat, lon]} 
            selectedHotel={selectedHotel}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
}
