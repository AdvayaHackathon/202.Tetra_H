'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../_components/LanguageSelector';

export default function MakeTrip() {
    const { translations } = useLanguage();
    const [price, setPrice] = useState(1000);
    const [days, setDays] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [flightPrices, setFlightPrices] = useState([]);
    const [hotelPrices, setHotelPrices] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [sessionKey, setSessionKey] = useState(null);
    const [tripType, setTripType] = useState('Solo');

    // Mock flight data for all destinations
    const mockFlightData = {
        // International Destinations
        'Phuket': [
            { airline: 'Thai Airways', departure: '08:00', arrival: '12:30', duration: '4h 30m', price: 25000 },
            { airline: 'Air India', departure: '14:00', arrival: '18:45', duration: '4h 45m', price: 22000 },
            { airline: 'IndiGo', departure: '20:00', arrival: '00:30', duration: '4h 30m', price: 20000 }
        ],
        'Chiang Mai': [
            { airline: 'Thai Airways', departure: '09:00', arrival: '13:15', duration: '4h 15m', price: 28000 },
            { airline: 'Air India', departure: '15:00', arrival: '19:30', duration: '4h 30m', price: 25000 }
        ],
        'Sydney': [
            { airline: 'Qantas', departure: '22:00', arrival: '14:30', duration: '12h 30m', price: 65000 },
            { airline: 'Air India', departure: '20:00', arrival: '12:45', duration: '12h 45m', price: 60000 }
        ],
        'Santorini': [
            { airline: 'Emirates', departure: '02:00', arrival: '12:30', duration: '10h 30m', price: 55000 },
            { airline: 'Air India', departure: '04:00', arrival: '14:45', duration: '10h 45m', price: 50000 }
        ],
        'Istanbul': [
            { airline: 'Turkish Airlines', departure: '01:00', arrival: '06:30', duration: '5h 30m', price: 35000 },
            { airline: 'Air India', departure: '03:00', arrival: '08:45', duration: '5h 45m', price: 32000 }
        ],
        'London': [
            { airline: 'British Airways', departure: '23:00', arrival: '05:30', duration: '8h 30m', price: 45000 },
            { airline: 'Air India', departure: '21:00', arrival: '03:45', duration: '8h 45m', price: 40000 }
        ],
        'Paris': [
            { airline: 'Air France', departure: '22:00', arrival: '04:30', duration: '8h 30m', price: 42000 },
            { airline: 'Air India', departure: '20:00', arrival: '02:45', duration: '8h 45m', price: 38000 }
        ],
        'Rome': [
            { airline: 'Alitalia', departure: '21:00', arrival: '03:30', duration: '8h 30m', price: 40000 },
            { airline: 'Air India', departure: '19:00', arrival: '01:45', duration: '8h 45m', price: 36000 }
        ],
        'Barcelona': [
            { airline: 'Iberia', departure: '20:00', arrival: '02:30', duration: '8h 30m', price: 38000 },
            { airline: 'Air India', departure: '18:00', arrival: '00:45', duration: '8h 45m', price: 34000 }
        ],
        'New York': [
            { airline: 'Delta', departure: '00:00', arrival: '06:30', duration: '14h 30m', price: 75000 },
            { airline: 'Air India', departure: '02:00', arrival: '08:45', duration: '14h 45m', price: 70000 }
        ],
        'Tokyo': [
            { airline: 'Japan Airlines', departure: '23:00', arrival: '09:30', duration: '8h 30m', price: 45000 },
            { airline: 'Air India', departure: '21:00', arrival: '07:45', duration: '8h 45m', price: 40000 }
        ],
        'Berlin': [
            { airline: 'Lufthansa', departure: '22:00', arrival: '04:30', duration: '8h 30m', price: 42000 },
            { airline: 'Air India', departure: '20:00', arrival: '02:45', duration: '8h 45m', price: 38000 }
        ],
        'Lisbon': [
            { airline: 'TAP Portugal', departure: '21:00', arrival: '03:30', duration: '8h 30m', price: 40000 },
            { airline: 'Air India', departure: '19:00', arrival: '01:45', duration: '8h 45m', price: 36000 }
        ],
        'Zurich': [
            { airline: 'Swiss', departure: '20:00', arrival: '02:30', duration: '8h 30m', price: 38000 },
            { airline: 'Air India', departure: '18:00', arrival: '00:45', duration: '8h 45m', price: 34000 }
        ],
        'Bali': [
            { airline: 'Garuda Indonesia', departure: '01:00', arrival: '08:30', duration: '7h 30m', price: 35000 },
            { airline: 'Air India', departure: '03:00', arrival: '10:45', duration: '7h 45m', price: 32000 }
        ],
        'Cairo': [
            { airline: 'EgyptAir', departure: '02:00', arrival: '06:30', duration: '4h 30m', price: 25000 },
            { airline: 'Air India', departure: '04:00', arrival: '08:45', duration: '4h 45m', price: 22000 }
        ],
        'Dubai': [
            { airline: 'Emirates', departure: '03:00', arrival: '05:30', duration: '2h 30m', price: 15000 },
            { airline: 'Air India', departure: '05:00', arrival: '07:45', duration: '2h 45m', price: 12000 }
        ],
        'Mexico City': [
            { airline: 'Aeromexico', departure: '00:00', arrival: '14:30', duration: '16h 30m', price: 85000 },
            { airline: 'Air India', departure: '02:00', arrival: '16:45', duration: '16h 45m', price: 80000 }
        ],
        'Rio de Janeiro': [
            { airline: 'LATAM', departure: '23:00', arrival: '12:30', duration: '15h 30m', price: 80000 },
            { airline: 'Air India', departure: '21:00', arrival: '10:45', duration: '15h 45m', price: 75000 }
        ],
        'Cape Town': [
            { airline: 'South African Airways', departure: '22:00', arrival: '08:30', duration: '10h 30m', price: 55000 },
            { airline: 'Air India', departure: '20:00', arrival: '06:45', duration: '10h 45m', price: 50000 }
        ],
        'Toronto': [
            { airline: 'Air Canada', departure: '21:00', arrival: '06:30', duration: '13h 30m', price: 70000 },
            { airline: 'Air India', departure: '19:00', arrival: '04:45', duration: '13h 45m', price: 65000 }
        ],
        'Hanoi': [
            { airline: 'Vietnam Airlines', departure: '20:00', arrival: '04:30', duration: '4h 30m', price: 20000 },
            { airline: 'Air India', departure: '18:00', arrival: '02:45', duration: '4h 45m', price: 18000 }
        ],
        'Marrakech': [
            { airline: 'Royal Air Maroc', departure: '19:00', arrival: '01:30', duration: '8h 30m', price: 35000 },
            { airline: 'Air India', departure: '17:00', arrival: '23:45', duration: '8h 45m', price: 32000 }
        ],
        'Vienna': [
            { airline: 'Austrian Airlines', departure: '18:00', arrival: '00:30', duration: '8h 30m', price: 38000 },
            { airline: 'Air India', departure: '16:00', arrival: '22:45', duration: '8h 45m', price: 34000 }
        ],
        'Dubrovnik': [
            { airline: 'Croatia Airlines', departure: '17:00', arrival: '23:30', duration: '8h 30m', price: 35000 },
            { airline: 'Air India', departure: '15:00', arrival: '21:45', duration: '8h 45m', price: 32000 }
        ],
        'Auckland': [
            { airline: 'Air New Zealand', departure: '16:00', arrival: '10:30', duration: '14h 30m', price: 75000 },
            { airline: 'Air India', departure: '14:00', arrival: '08:45', duration: '14h 45m', price: 70000 }
        ],

        // Indian Destinations
        'Delhi': [
            { airline: 'IndiGo', departure: '06:00', arrival: '08:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '12:00', arrival: '14:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '18:00', arrival: '20:00', duration: '2h', price: 5500 }
        ],
        'Mumbai': [
            { airline: 'IndiGo', departure: '07:00', arrival: '09:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '13:00', arrival: '15:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '19:00', arrival: '21:00', duration: '2h', price: 5500 }
        ],
        'Bangalore': [
            { airline: 'IndiGo', departure: '08:00', arrival: '10:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '14:00', arrival: '16:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '20:00', arrival: '22:00', duration: '2h', price: 5500 }
        ],
        'Chennai': [
            { airline: 'IndiGo', departure: '09:00', arrival: '11:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '15:00', arrival: '17:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '21:00', arrival: '23:00', duration: '2h', price: 5500 }
        ],
        'Kolkata': [
            { airline: 'IndiGo', departure: '10:00', arrival: '12:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '16:00', arrival: '18:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '22:00', arrival: '00:00', duration: '2h', price: 5500 }
        ],
        'Hyderabad': [
            { airline: 'IndiGo', departure: '11:00', arrival: '13:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '17:00', arrival: '19:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '23:00', arrival: '01:00', duration: '2h', price: 5500 }
        ],
        'Ahmedabad': [
            { airline: 'IndiGo', departure: '12:00', arrival: '14:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '18:00', arrival: '20:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '00:00', arrival: '02:00', duration: '2h', price: 5500 }
        ],
        'Pune': [
            { airline: 'IndiGo', departure: '13:00', arrival: '15:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '19:00', arrival: '21:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '01:00', arrival: '03:00', duration: '2h', price: 5500 }
        ],
        'Jaipur': [
            { airline: 'IndiGo', departure: '14:00', arrival: '16:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '20:00', arrival: '22:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '02:00', arrival: '04:00', duration: '2h', price: 5500 }
        ],
        'Lucknow': [
            { airline: 'IndiGo', departure: '15:00', arrival: '17:00', duration: '2h', price: 5000 },
            { airline: 'Air India', departure: '21:00', arrival: '23:00', duration: '2h', price: 4500 },
            { airline: 'Vistara', departure: '03:00', arrival: '05:00', duration: '2h', price: 5500 }
        ]
    };

    // Mock hotel data for all destinations
    const mockHotelData = {
        // International Destinations
        'Phuket': [
            { name: 'Phuket Marriott Resort', location: 'Nai Yang Beach', price: 8000, rating: 4.5 },
            { name: 'The Naka Island Resort', location: 'Naka Island', price: 12000, rating: 4.8 },
            { name: 'Banyan Tree Phuket', location: 'Laguna', price: 10000, rating: 4.7 }
        ],
        'Chiang Mai': [
            { name: 'Four Seasons Resort', location: 'Mae Rim', price: 15000, rating: 4.9 },
            { name: '137 Pillars House', location: 'Wat Gate', price: 9000, rating: 4.6 }
        ],
        'Sydney': [
            { name: 'Park Hyatt Sydney', location: 'The Rocks', price: 25000, rating: 4.8 },
            { name: 'Shangri-La Hotel', location: 'Circular Quay', price: 20000, rating: 4.7 }
        ],
        'Santorini': [
            { name: 'Canaves Oia Suites', location: 'Oia', price: 30000, rating: 4.9 },
            { name: 'Grace Hotel', location: 'Imerovigli', price: 25000, rating: 4.8 }
        ],
        'Istanbul': [
            { name: 'Four Seasons Hotel', location: 'Sultanahmet', price: 15000, rating: 4.8 },
            { name: 'Çırağan Palace Kempinski', location: 'Beşiktaş', price: 20000, rating: 4.9 }
        ],
        'London': [
            { name: 'The Ritz London', location: 'Piccadilly', price: 30000, rating: 4.9 },
            { name: 'The Savoy', location: 'Strand', price: 25000, rating: 4.8 }
        ],
        'Paris': [
            { name: 'Hotel Ritz Paris', location: 'Place Vendôme', price: 35000, rating: 4.9 },
            { name: 'Four Seasons Hotel', location: 'George V', price: 30000, rating: 4.8 }
        ],
        'Rome': [
            { name: 'Hotel de Russie', location: 'Piazza del Popolo', price: 25000, rating: 4.8 },
            { name: 'Hotel Eden', location: 'Via Ludovisi', price: 20000, rating: 4.7 }
        ],
        'Barcelona': [
            { name: 'Hotel Arts Barcelona', location: 'Port Olímpic', price: 20000, rating: 4.8 },
            { name: 'Mandarin Oriental', location: 'Passeig de Gràcia', price: 25000, rating: 4.9 }
        ],
        'New York': [
            { name: 'The Plaza Hotel', location: 'Fifth Avenue', price: 40000, rating: 4.9 },
            { name: 'Four Seasons Hotel', location: '57th Street', price: 35000, rating: 4.8 }
        ],
        'Tokyo': [
            { name: 'The Ritz-Carlton', location: 'Roppongi', price: 30000, rating: 4.9 },
            { name: 'Park Hotel Tokyo', location: 'Shiodome', price: 25000, rating: 4.8 }
        ],
        'Berlin': [
            { name: 'Hotel Adlon Kempinski', location: 'Unter den Linden', price: 20000, rating: 4.8 },
            { name: 'The Ritz-Carlton', location: 'Potsdamer Platz', price: 25000, rating: 4.9 }
        ],
        'Lisbon': [
            { name: 'Four Seasons Hotel', location: 'Ritz Lisbon', price: 20000, rating: 4.8 },
            { name: 'Pestana Palace', location: 'Alcântara', price: 15000, rating: 4.7 }
        ],
        'Zurich': [
            { name: 'Baur au Lac', location: 'Lake Zurich', price: 25000, rating: 4.9 },
            { name: 'The Dolder Grand', location: 'Adlisberg', price: 30000, rating: 4.8 }
        ],
        'Bali': [
            { name: 'Four Seasons Resort', location: 'Jimbaran Bay', price: 20000, rating: 4.9 },
            { name: 'The Mulia', location: 'Nusa Dua', price: 18000, rating: 4.8 }
        ],
        'Cairo': [
            { name: 'Four Seasons Hotel', location: 'Nile Plaza', price: 15000, rating: 4.8 },
            { name: 'The Nile Ritz-Carlton', location: 'Tahrir Square', price: 18000, rating: 4.7 }
        ],
        'Dubai': [
            { name: 'Burj Al Arab', location: 'Jumeirah', price: 40000, rating: 4.9 },
            { name: 'Atlantis The Palm', location: 'Palm Jumeirah', price: 30000, rating: 4.8 }
        ],
        'Mexico City': [
            { name: 'Four Seasons Hotel', location: 'Paseo de la Reforma', price: 20000, rating: 4.8 },
            { name: 'Las Alcobas', location: 'Polanco', price: 18000, rating: 4.7 }
        ],
        'Rio de Janeiro': [
            { name: 'Belmundo Hotel', location: 'Santa Teresa', price: 15000, rating: 4.8 },
            { name: 'Fasano Rio de Janeiro', location: 'Ipanema', price: 20000, rating: 4.9 }
        ],
        'Cape Town': [
            { name: 'One&Only Cape Town', location: 'V&A Waterfront', price: 25000, rating: 4.9 },
            { name: 'The Silo Hotel', location: 'V&A Waterfront', price: 30000, rating: 4.8 }
        ],
        'Toronto': [
            { name: 'Four Seasons Hotel', location: 'Yorkville', price: 20000, rating: 4.8 },
            { name: 'The Ritz-Carlton', location: 'Financial District', price: 25000, rating: 4.9 }
        ],
        'Hanoi': [
            { name: 'Sofitel Legend Metropole', location: 'Hoan Kiem District', price: 15000, rating: 4.8 },
            { name: 'InterContinental Hanoi', location: 'West Lake', price: 12000, rating: 4.7 }
        ],
        'Marrakech': [
            { name: 'Royal Mansour', location: 'Medina', price: 30000, rating: 4.9 },
            { name: 'La Mamounia', location: 'Hivernage', price: 25000, rating: 4.8 }
        ],
        'Vienna': [
            { name: 'Hotel Sacher', location: 'Philharmonikerstrasse', price: 20000, rating: 4.8 },
            { name: 'The Ritz-Carlton', location: 'Schubertring', price: 25000, rating: 4.9 }
        ],
        'Dubrovnik': [
            { name: 'Hotel Excelsior', location: 'Adriatic Sea', price: 18000, rating: 4.8 },
            { name: 'Villa Dubrovnik', location: 'Lapad Bay', price: 20000, rating: 4.9 }
        ],
        'Auckland': [
            { name: 'Sofitel Auckland', location: 'Viaduct Harbour', price: 20000, rating: 4.8 },
            { name: 'Cordis Auckland', location: 'Symonds Street', price: 18000, rating: 4.7 }
        ],

        // Indian Destinations
        'Delhi': [
            { name: 'The Leela Palace', location: 'Chanakyapuri', price: 12000, rating: 4.8 },
            { name: 'The Oberoi', location: 'Dr. Zakir Hussain Marg', price: 15000, rating: 4.9 },
            { name: 'Taj Palace', location: 'Sardar Patel Marg', price: 10000, rating: 4.7 }
        ],
        'Mumbai': [
            { name: 'Taj Mahal Palace', location: 'Colaba', price: 15000, rating: 4.9 },
            { name: 'The Oberoi', location: 'Nariman Point', price: 12000, rating: 4.8 },
            { name: 'Trident Nariman Point', location: 'Nariman Point', price: 10000, rating: 4.7 }
        ],
        'Bangalore': [
            { name: 'The Leela Palace', location: 'Old Airport Road', price: 12000, rating: 4.8 },
            { name: 'Taj West End', location: 'Race Course Road', price: 10000, rating: 4.7 },
            { name: 'ITC Gardenia', location: 'Residency Road', price: 9000, rating: 4.6 }
        ],
        'Chennai': [
            { name: 'The Leela Palace', location: 'Guindy', price: 12000, rating: 4.8 },
            { name: 'Taj Coromandel', location: 'Nungambakkam', price: 10000, rating: 4.7 },
            { name: 'ITC Grand Chola', location: 'Guindy', price: 9000, rating: 4.6 }
        ],
        'Kolkata': [
            { name: 'The Oberoi Grand', location: 'Chowringhee', price: 10000, rating: 4.7 },
            { name: 'Taj Bengal', location: 'Alipore', price: 9000, rating: 4.6 },
            { name: 'ITC Royal Bengal', location: 'New Town', price: 8000, rating: 4.5 }
        ],
        'Hyderabad': [
            { name: 'Taj Falaknuma Palace', location: 'Falaknuma', price: 15000, rating: 4.9 },
            { name: 'ITC Kohenur', location: 'HITEC City', price: 9000, rating: 4.6 },
            { name: 'The Park Hyderabad', location: 'Somajiguda', price: 8000, rating: 4.5 }
        ],
        'Ahmedabad': [
            { name: 'The Leela', location: 'Sarkhej', price: 9000, rating: 4.6 },
            { name: 'Hyatt Regency', location: 'Vastrapur', price: 8000, rating: 4.5 },
            { name: 'Courtyard by Marriott', location: 'Prahlad Nagar', price: 7000, rating: 4.4 }
        ],
        'Pune': [
            { name: 'The Westin', location: 'Koregaon Park', price: 9000, rating: 4.6 },
            { name: 'Hyatt Regency', location: 'Kalyani Nagar', price: 8000, rating: 4.5 },
            { name: 'JW Marriott', location: 'Senapati Bapat Road', price: 7000, rating: 4.4 }
        ],
        'Jaipur': [
            { name: 'Rambagh Palace', location: 'Bhawani Singh Road', price: 12000, rating: 4.8 },
            { name: 'The Oberoi Rajvilas', location: 'Goner Road', price: 15000, rating: 4.9 },
            { name: 'Jai Mahal Palace', location: 'Jacob Road', price: 10000, rating: 4.7 }
        ],
        'Lucknow': [
            { name: 'Taj Mahal Lucknow', location: 'Gomti Nagar', price: 9000, rating: 4.6 },
            { name: 'Hyatt Regency', location: 'Gomti Nagar', price: 8000, rating: 4.5 },
            { name: 'Vivanta by Taj', location: 'Gomti Nagar', price: 7000, rating: 4.4 }
        ]
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const filterOptionsByBudget = (flightOptions, hotelOptions, budget) => {
        // Sort options by price (ascending)
        const sortedFlights = [...flightOptions].sort((a, b) => a.price - b.price);
        const sortedHotels = [...hotelOptions].sort((a, b) => a.price - b.price);

        // Calculate budget allocations
        const flightBudget = budget * 0.4; // 40% for flights
        const hotelBudget = budget * 0.6; // 60% for hotels

        // Get all flights and hotels within budget
        const affordableFlights = sortedFlights.filter(flight => flight.price <= flightBudget);
        const affordableHotels = sortedHotels.filter(hotel => hotel.price <= (hotelBudget / days));

        // If budget is too low, switch to auto mode and select cheapest options
        if (affordableFlights.length === 0 || affordableHotels.length === 0) {
            setIsAutoMode(true);
            return {
                flights: [sortedFlights[0]],
                hotels: [sortedHotels[0]]
            };
        }

        // If we have selections and they're within budget, keep them
        if (selectedFlight && selectedHotel && 
            selectedFlight.price <= flightBudget && 
            selectedHotel.price <= (hotelBudget / days)) {
            return {
                flights: [selectedFlight],
                hotels: [selectedHotel]
            };
        }

        // Otherwise, show all affordable options
        return {
            flights: affordableFlights,
            hotels: affordableHotels
        };
    };

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
        setIsAutoMode(false);
    };

    const handleHotelSelect = (hotel) => {
        setSelectedHotel(hotel);
        setIsAutoMode(false);
    };

    const fetchPrices = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const cityFlights = mockFlightData[selectedCity] || [];
            const cityHotels = mockHotelData[selectedCity] || [];
            
            if (cityFlights.length === 0 || cityHotels.length === 0) {
                throw new Error(`No data available for ${selectedCity}`);
            }

            // Filter options based on budget
            const { flights, hotels } = filterOptionsByBudget(cityFlights, cityHotels, price);
            
            setFlightPrices(flights);
            setHotelPrices(hotels);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDate && days > 0) {
            fetchPrices();
        }
    }, [selectedDate, days, selectedCity, price]);

    return (
        <div className="min-h-screen w-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md" role="navigation" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <a href="/" className="text-gray-800 hover:text-orange-500 transition-colors duration-300" aria-label="Go to home page">
                                {translations.home}
                            </a>
                            <a href="/Started" className="text-gray-800 hover:text-orange-500 transition-colors duration-300" aria-label="Go to popular destinations">
                                {translations.popularDestinations}
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <LanguageSelector />
                            <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors duration-300" aria-label="Learn more about us">
                                {translations.aboutUs}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-orange-500" tabIndex="0">Plan Your Trip</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Trip Details */}
                    <div className="bg-white p-6 rounded-xl shadow-lg" role="region" aria-label="Trip details">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800" tabIndex="0">Trip Details</h2>
                        
                        {/* Filters Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* Destination Selection */}
                            <div className="relative z-10">
                                <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">Destination</label>
                                <select
                                    id="destination"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                    aria-label="Select destination city"
                                >
                                    <optgroup label="International Destinations">
                                        <option value="Phuket">Phuket, Thailand</option>
                                        <option value="Chiang Mai">Chiang Mai, Thailand</option>
                                        <option value="Sydney">Sydney, Australia</option>
                                        <option value="Santorini">Santorini, Greece</option>
                                        <option value="Istanbul">Istanbul, Turkey</option>
                                        <option value="London">London, UK</option>
                                        <option value="Paris">Paris, France</option>
                                        <option value="Rome">Rome, Italy</option>
                                        <option value="Barcelona">Barcelona, Spain</option>
                                        <option value="New York">New York, USA</option>
                                        <option value="Tokyo">Tokyo, Japan</option>
                                        <option value="Berlin">Berlin, Germany</option>
                                        <option value="Lisbon">Lisbon, Portugal</option>
                                        <option value="Zurich">Zurich, Switzerland</option>
                                        <option value="Bali">Bali, Indonesia</option>
                                        <option value="Cairo">Cairo, Egypt</option>
                                        <option value="Dubai">Dubai, UAE</option>
                                        <option value="Mexico City">Mexico City, Mexico</option>
                                        <option value="Rio de Janeiro">Rio de Janeiro, Brazil</option>
                                        <option value="Cape Town">Cape Town, South Africa</option>
                                        <option value="Toronto">Toronto, Canada</option>
                                        <option value="Hanoi">Hanoi, Vietnam</option>
                                        <option value="Marrakech">Marrakech, Morocco</option>
                                        <option value="Vienna">Vienna, Austria</option>
                                        <option value="Dubrovnik">Dubrovnik, Croatia</option>
                                        <option value="Auckland">Auckland, New Zealand</option>
                                    </optgroup>
                                    <optgroup label="Indian Destinations">
                                        <option value="Mumbai">Mumbai, India</option>
                                        <option value="Delhi">Delhi, India</option>
                                        <option value="Bangalore">Bangalore, India</option>
                                        <option value="Chennai">Chennai, India</option>
                                        <option value="Kolkata">Kolkata, India</option>
                                        <option value="Hyderabad">Hyderabad, India</option>
                                        <option value="Ahmedabad">Ahmedabad, India</option>
                                        <option value="Pune">Pune, India</option>
                                        <option value="Jaipur">Jaipur, India</option>
                                        <option value="Lucknow">Lucknow, India</option>
                                    </optgroup>
                                </select>
                            </div>

                            {/* Price Range Slider */}
                            <div className="relative z-0 -mt-8 md:mt-0">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="budget" className="text-gray-700 font-medium">Budget</label>
                                    <span className="text-orange-500 font-semibold" aria-live="polite">{formatPrice(price)}</span>
                                </div>
                                <input
                                    id="budget"
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="1000"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    aria-label="Select your budget"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                    <span>{formatPrice(1000)}</span>
                                    <span>{formatPrice(200000)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2" aria-live="polite">
                                    {price < 5000 ? 'Budget too low for flights and hotels' : 
                                     price < 10000 ? 'Limited options available' : 
                                     'Good budget for comfortable travel'}
                                </p>
                            </div>

                            {/* Number of Days */}
                            <div className="relative z-10 -mt-8 md:mt-0">
                                <label className="block text-gray-700 font-medium mb-2">Number of Days</label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setDays(Math.max(1, days - 1))}
                                        className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center hover:bg-orange-200 transition-colors"
                                        aria-label="Decrease number of days"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-semibold text-gray-800" aria-live="polite">{days}</span>
                                    <button
                                        onClick={() => setDays(days + 1)}
                                        className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center hover:bg-orange-200 transition-colors"
                                        aria-label="Increase number of days"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="relative z-0 -mt-8 md:mt-0">
                                <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={selectedDate.toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                    min={new Date().toISOString().split('T')[0]}
                                    aria-label="Select start date"
                                />
                            </div>
                        </div>

                        {/* Trip Type */}
                        <div className="mb-8" role="region" aria-label="Trip type selection">
                            <label className="block text-gray-700 font-medium mb-2">Trip Type</label>
                            <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-label="Select trip type">
                                <button 
                                    className={`px-4 py-2 border rounded-lg transition-colors ${
                                        tripType === 'Solo' 
                                            ? 'border-orange-500 bg-orange-50 text-orange-500' 
                                            : 'border-gray-300 hover:bg-orange-50 hover:border-orange-500'
                                    }`}
                                    onClick={() => setTripType('Solo')}
                                    role="radio"
                                    aria-checked={tripType === 'Solo'}
                                    aria-label="Solo trip"
                                >
                                    Solo
                                </button>
                                <button 
                                    className={`px-4 py-2 border rounded-lg transition-colors ${
                                        tripType === 'Family' 
                                            ? 'border-orange-500 bg-orange-50 text-orange-500' 
                                            : 'border-gray-300 hover:bg-orange-50 hover:border-orange-500'
                                    }`}
                                    onClick={() => setTripType('Family')}
                                    role="radio"
                                    aria-checked={tripType === 'Family'}
                                    aria-label="Family trip"
                                >
                                    Family
                                </button>
                                <button 
                                    className={`px-4 py-2 border rounded-lg transition-colors ${
                                        tripType === 'Friends' 
                                            ? 'border-orange-500 bg-orange-50 text-orange-500' 
                                            : 'border-gray-300 hover:bg-orange-50 hover:border-orange-500'
                                    }`}
                                    onClick={() => setTripType('Friends')}
                                    role="radio"
                                    aria-checked={tripType === 'Friends'}
                                    aria-label="Friends trip"
                                >
                                    Friends
                                </button>
                                <button 
                                    className={`px-4 py-2 border rounded-lg transition-colors ${
                                        tripType === 'Couple' 
                                            ? 'border-orange-500 bg-orange-50 text-orange-500' 
                                            : 'border-gray-300 hover:bg-orange-50 hover:border-orange-500'
                                    }`}
                                    onClick={() => setTripType('Couple')}
                                    role="radio"
                                    aria-checked={tripType === 'Couple'}
                                    aria-label="Couple trip"
                                >
                                    Couple
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Preview */}
                    <div className="bg-white p-6 rounded-xl shadow-lg" role="region" aria-label="Trip preview">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800" tabIndex="0">Trip Preview</h2>
                        <div className="bg-orange-50 p-6 rounded-lg">
                            <div className="space-y-4" role="list">
                                <div className="flex justify-between" role="listitem">
                                    <span className="text-gray-600">Destination:</span>
                                    <span className="font-semibold" aria-live="polite">{selectedCity}</span>
                                </div>
                                <div className="flex justify-between" role="listitem">
                                    <span className="text-gray-600">Budget:</span>
                                    <span className="font-semibold text-orange-500" aria-live="polite">{formatPrice(price)}</span>
                                </div>
                                <div className="flex justify-between" role="listitem">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-semibold" aria-live="polite">{days} {days === 1 ? 'day' : 'days'}</span>
                                </div>
                                <div className="flex justify-between" role="listitem">
                                    <span className="text-gray-600">Start Date:</span>
                                    <span className="font-semibold" aria-live="polite">
                                        {selectedDate.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                {flightPrices && flightPrices.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between" role="listitem">
                                            <span className="text-gray-600">Flight Options:</span>
                                        </div>
                                        {flightPrices.map((flight, index) => (
                                            <div 
                                                key={index}
                                                className={`p-4 border rounded-lg cursor-pointer hover:bg-orange-50 transition-colors ${
                                                    selectedFlight?.airline === flight.airline ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                                                }`}
                                                onClick={() => handleFlightSelect(flight)}
                                                role="button"
                                                tabIndex="0"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{flight.airline}</span>
                                                    <span className="text-orange-500">{formatPrice(flight.price)}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {flight.departure} - {flight.arrival} ({flight.duration})
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {hotelPrices && hotelPrices.length > 0 && (
                                    <div className="space-y-4 mt-6">
                                        <div className="flex justify-between" role="listitem">
                                            <span className="text-gray-600">Hotel Options:</span>
                                        </div>
                                        {hotelPrices.map((hotel, index) => (
                                            <div 
                                                key={index}
                                                className={`p-4 border rounded-lg cursor-pointer hover:bg-orange-50 transition-colors ${
                                                    selectedHotel?.name === hotel.name ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                                                }`}
                                                onClick={() => handleHotelSelect(hotel)}
                                                role="button"
                                                tabIndex="0"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{hotel.name}</span>
                                                    <span className="text-orange-500">{formatPrice(hotel.price)}/night</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {hotel.location} • Rating: {hotel.rating}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {isAutoMode && (
                                    <div className="text-sm text-orange-500 mt-4" role="alert">
                                        Auto-selected cheapest options due to budget constraints
                                    </div>
                                )}
                                {flightPrices && hotelPrices && flightPrices.length > 0 && hotelPrices.length > 0 && (
                                    <>
                                        <div className="flex justify-between border-t border-gray-200 pt-4 mt-4" role="listitem">
                                            <span className="text-gray-600 font-semibold">Total Estimated Cost:</span>
                                            <span className="font-bold text-orange-500" aria-live="polite">
                                                {formatPrice(
                                                    (selectedFlight?.price || 0) + 
                                                    ((selectedHotel?.price || 0) * days)
                                                )}
                                            </span>
                                        </div>
                                        <div 
                                            className={`text-sm ${(selectedFlight?.price || 0) + ((selectedHotel?.price || 0) * days) > price ? 'text-red-500' : 'text-green-500'}`}
                                            role="alert"
                                            aria-live="polite"
                                        >
                                            {(selectedFlight?.price || 0) + ((selectedHotel?.price || 0) * days) > price ? 
                                                'Warning: Total cost exceeds your budget' : 
                                                'Within budget'}
                                        </div>
                                    </>
                                )}
                            </div>
                            <button 
                                className={`w-full mt-8 py-3 rounded-lg font-semibold transition-colors ${
                                    (selectedFlight?.price || 0) + ((selectedHotel?.price || 0) * days) > price ?
                                    'bg-gray-400 cursor-not-allowed' :
                                    'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                                onClick={fetchPrices}
                                disabled={(selectedFlight?.price || 0) + ((selectedHotel?.price || 0) * days) > price}
                                aria-label="Generate trip plan"
                            >
                                {loading ? 'Loading...' : 'Generate Trip Plan'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 