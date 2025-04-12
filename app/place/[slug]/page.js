"use client"

import dynamic from 'next/dynamic';
import {useState, useEffect} from "react"
import { useParams } from "next/navigation";

const MyMap = dynamic(() => import("../../_components/MyMap"), {
  ssr: false,
});

export default function(){

  const params = useParams();
  const slug = params.slug;

  const[lat, setLat] = useState(null)
  const[lon, setLon] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [hotelList, setHotelist] = useState([])
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [weather, setWeather] = useState(null)

  const body = `
[out:json];
(
  node["tourism"="hotel"](around:1000, ${lat}, ${lon});
  node["amenity"="restaurant"](around:1000, ${lat}, ${lon});
);
out body;
out tags;
`

  useEffect(() => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${slug}&format=json`)
    .then( res => res.json())
    .then(data => {
      setLat(data[0].lat)
      setLon(data[0].lon)
      setLoaded(true)
    })
  }, [slug])

  useEffect(() => {
    if (lat && lon) {
      // Fetch weather data from Open-Meteo
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
        .then(res => res.json())
        .then(data => {
          setWeather(data)
        })
    }
  }, [lat, lon])

  useEffect(() => {
    if (lat) {
      fetch("https://overpass-api.de/api/interpreter", {
        method : "POST",
        body 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setHotelist(data.elements)
      })
    }
  }, [lat])

  const getWeatherRecommendation = () => {
    if (!weather) return null;
    
    const currentTemp = weather.current.temperature_2m;
    let recommendation = '';
    let isRecommended = true;

    // Determine place type from slug
    const slugLower = slug.toLowerCase();
    let placeType = 'general';
    
    if (slugLower.includes('beach') || slugLower.includes('coast')) {
      placeType = 'beach';
    } else if (slugLower.includes('mountain') || slugLower.includes('peak')) {
      placeType = 'mountain';
    } else if (slugLower.includes('park') || slugLower.includes('garden')) {
      placeType = 'park';
    }

    switch(placeType) {
      case 'beach':
        if (currentTemp < 15) {
          recommendation = 'Too cold for beach activities';
          isRecommended = false;
        } else if (currentTemp > 35) {
          recommendation = 'Too hot for comfortable beach visit';
          isRecommended = false;
        } else {
          recommendation = 'Great weather for the beach!';
        }
        break;
      case 'mountain':
        if (currentTemp < -10) {
          recommendation = 'Too cold for mountain activities';
          isRecommended = false;
        } else if (currentTemp > 25) {
          recommendation = 'Too hot for comfortable hiking';
          isRecommended = false;
        } else {
          recommendation = 'Perfect weather for mountain activities!';
        }
        break;
      case 'park':
        if (currentTemp < 5) {
          recommendation = 'Too cold for park visit';
          isRecommended = false;
        } else if (currentTemp > 30) {
          recommendation = 'Too hot for comfortable park visit';
          isRecommended = false;
        } else {
          recommendation = 'Ideal weather for park activities!';
        }
        break;
      default:
        if (currentTemp < 10) {
          recommendation = 'Quite cold for outdoor activities';
          isRecommended = false;
        } else if (currentTemp > 30) {
          recommendation = 'Very hot for comfortable visit';
          isRecommended = false;
        } else {
          recommendation = 'Good weather for visit!';
        }
    }

    return { recommendation, isRecommended };
  }

  const showHotelList = hotelList.map((hotel, ind) => (
    <div 
      key={ind} 
      className={`p-3 mb-2 border rounded-lg transition-colors cursor-pointer ${
        selectedHotel?.id === hotel.id 
          ? 'bg-blue-50 border-blue-300' 
          : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
      }`}
      onClick={() => setSelectedHotel(hotel)}
    >
      <h3 className={`font-medium ${
        selectedHotel?.id === hotel.id ? 'text-blue-800' : 'text-orange-800'
      }`}>
        {hotel.tags.name}
      </h3>
      {hotel.tags.website && (
        <a 
          href={hotel.tags.website.startsWith('http') ? hotel.tags.website : `https://${hotel.tags.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-800 text-sm block mt-1"
        >
          🌐 Visit Website
        </a>
      )}
      {hotel.tags.phone && (
        <a 
          href={`tel:${hotel.tags.phone}`}
          className="text-orange-600 hover:text-orange-800 text-sm block mt-1"
        >
          📞 {hotel.tags.phone}
        </a>
      )}
    </div>
  ));

  const weatherInfo = getWeatherRecommendation();

  return(
    <div className="flex min-h-screen bg-orange-50">
      {/* Left Sidebar */}
      <div className="w-80 p-4">
        {loaded ? (
          <>
            {/* Weather Box */}
            <div className="bg-white p-3 rounded-lg shadow-md border border-orange-200 mb-4">
              <h2 className="text-lg font-semibold text-orange-700 mb-2">Current Weather</h2>
              {weather && (
                <div className="bg-orange-50 p-2 rounded">
                  <p className="text-sm text-orange-800 mb-1">
                    Temperature: {weather.current.temperature_2m}°C
                  </p>
                  {weatherInfo && (
                    <p className={`text-sm font-medium ${
                      weatherInfo.isRecommended ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {weatherInfo.recommendation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Nearby Places Box */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-orange-200 h-[calc(100vh-11rem)]">
              <h2 className="text-xl font-semibold text-orange-700 mb-3">Nearby Places</h2>
              <div className="h-[calc(100%-2rem)] overflow-y-auto">
                {showHotelList}
              </div>
            </div>
          </>
        ) : (
          <div className="text-orange-600">loading...</div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 h-screen">
        {loaded ? (
          <MyMap 
            name={slug}
            position={[lat, lon]} 
            selectedHotel={selectedHotel ? {
              lat: parseFloat(selectedHotel.lat),
              lon: parseFloat(selectedHotel.lon),
              name: selectedHotel.tags.name
            } : null}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-orange-600">loading...</div>
        )}
      </div>
    </div>
  )
}