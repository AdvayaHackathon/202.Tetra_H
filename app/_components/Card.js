export default function Card({ place }) {
    // Create a mapping of place names to their actual image filenames
    const imageMapping = {
        // Thailand
        'Phuket': 'Phuket.jpg',
        'Chiang Mai': 'Chiang Mai.jpg',
        'Phi Phi Islands': 'Phi Phi Islands.jpg',
        'Grand Palace, Bangkok': 'Grand Palace.jpg',
        
        // Australia
        'Sydney Opera House': 'Sydney Opera House.jpg',
        'Great Barrier Reef': 'Great Barrier Reef.jpg',
        'Uluru (Ayers Rock)': 'Urulu.jpg',
        'Great Ocean Road': 'Great Ocean Road.jpg',
        
        // Greece
        'Santorini': 'Santorini.jpg',
        'Acropolis of Athens': 'Acropolis of Athens.jpg',
        'Mykonos': 'Mykonos.jpg',
        'Delphi': 'Delphi.jpg',
        
        // Turkey
        'Hagia Sophia': 'Hagia Sophia.jpg',
        'Cappadocia': 'Cappadocia.jpg',
        'Pamukkale': 'Pamukkale.jpg',
        'Blue Mosque': 'Blue Mosque.jpg',
        
        // United Kingdom
        'London Eye': 'London Eye.jpg',
        'Stonehenge': 'Stonehenge.jpg',
        'Edinburgh Castle': 'Edinburgh Castle.jpg',
        'Lake District': 'Lake District.jpg',
        
        // France
        'Eiffel Tower': 'Eiffel Tower.jpg',
        'Louvre Museum': 'Loure Museum.jpg',
        'French Riviera': 'French Riviera.jpg',
        'Mont Saint-Michel': 'Mount Saint Michel.jpg',
        
        // Italy
        'Colosseum': 'Colosseum.jpg',
        'Venice Canals': 'Venice Canals.jpg',
        'Amalfi Coast': 'Amalfi Coast.jpg',
        'Florence Cathedral': 'Florence Cathedral.jpg',
        
        // Spain
        'Sagrada Familia': 'Sagrada Familia.jpg',
        'Alhambra': 'Alhambra.jpg',
        'Ibiza': 'Libiza.jpg',
        'Seville Cathedral': 'Seville Cathedral.jpg',
        
        // United States
        'Grand Canyon': 'Grand Canyon.jpg',
        'New York City': 'New York.jpg',
        'Yellowstone National Park': 'Yellow Stone National Park.jpg',
        'Disney World': 'Disney World.jpg',
        
        // Japan
        'Mount Fuji': 'Mount Fuji.jpg',
        'Kyoto Temples': 'Kyoto Temples.jpg',
        'Tokyo Disneyland': 'Tokyo Disneyland.jpg',
        'Hiroshima Peace Memorial Park': 'Hiroshima Peace.jpg',
        
        // Germany
        'Neuschwanstein Castle': 'Neuschwanstein Castle.jpg',
        'Berlin Wall Memorial': 'Berlin Wall Of Memorial.jpg',
        'Black Forest': 'Black Forest.jpg',
        'Cologne Cathedral': 'Cologne Cathedral.jpg',
        
        // Portugal
        'Lisbon': 'Lisbon.jpg',
        'Douro Valley': 'Douro Valley.jpg',
        'Sintra': 'Sintra.jpg',
        'Madeira': 'Maderia.jpg',
        
        // Switzerland
        'Matterhorn': 'Mattehorn.jpg',
        'Lucerne': 'Lucerne.jpg',
        'Lake Geneva': 'Lake Geneva.jpg',
        'Interlaken': 'Interlaken.jpg',
        
        // Indonesia
        'Bali': 'Bali.jpg',
        'Borobudur Temple': 'Rumtek Monastery.jpg',
        'Komodo National Park': 'Komodo National Park.jpg',
        'Mount Bromo': 'Mount Bromo.jpg',
        
        // Egypt
        'Pyramids of Giza': 'Pyramids Of Giza.jpg',
        'Valley of the Kings': 'Valley Of The Kings.jpg',
        'Abu Simbel': 'Abu Simbel.jpg',
        'Nile River Cruise': 'Nile River Cruise.jpg',
        
        // United Arab Emirates
        'Burj Khalifa': 'Burj Khalifa.jpg',
        'Sheikh Zayed Grand Mosque': 'Shiek Zayad Grand Mosque.jpg',
        'Palm Jumeirah': 'Palm Jumeirah.jpg',
        'Dubai Desert Safari': 'Dubai Desert Safari.jpg',
        
        // Mexico
        'Chichen Itza': 'Chichen Itza.jpg',
        'Cancún': 'Cancun.jpg',
        'Mexico City Historic Center': 'Mexico City Historic Center.jpg',
        'Cenotes of Yucatán': 'Cenotes of yucantan.jpg',
        
        // Brazil
        'Christ the Redeemer': 'Christ The Redeemer.jpg',
        'Iguaçu Falls': 'Iguacu Falls.jpg',
        'Amazon Rainforest': 'Amazon Rainforest.jpg',
        'Copacabana Beach': 'Copacabana Beach.jpg',
        
        // South Africa
        'Kruger National Park': 'Kruger National Park.jpg',
        'Table Mountain': 'Table Mountain.jpg',
        'Robben Island': 'Robben Island.jpg',
        'Garden Route': 'Garden Route.jpg',
        
        // Canada
        'Niagara Falls': 'Nigara Falls.jpg',
        'Banff National Park': 'Banff National Park.jpg',
        'Quebec City': 'Quebec City.jpg',
        'CN Tower': 'Cn Tower.jpg',
        
        // Vietnam
        'Ha Long Bay': 'Ha Long Bay.jpg',
        'Hoi An Ancient Town': 'Hoi An Ancient Town.jpg',
        'Sapa Terraces': 'Sapa Terraces.jpg',
        'Ho Chi Minh City': 'How Chi Minh City.jpg',
        
        // Morocco
        'Marrakech Medina': 'Marrakech Medina.jpg',
        'Chefchaouen': 'Chefchaouen.jpg',
        'Sahara Desert': 'Sahara Desert.jpg',
        'Fes El Bali': 'Fes El Bali.jpg',
        
        // Austria
        'Schönbrunn Palace': 'Schonbrunn Palace.jpg',
        'Hallstatt': 'Hallstatt.jpg',
        'Salzburg': 'Salzburg.jpg',
        'Innsbruck': 'Innsbruck.jpg',
        
        // Croatia
        'Dubrovnik': 'Dubrovnik.jpg',
        'Plitvice Lakes National Park': 'Plitvice Lakes National Park.jpg',
        'Split': 'Split.jpg',
        'Hvar Island': 'Hvar Island.jpg',
        
        // New Zealand
        'Milford Sound': 'Milford Sound.jpg',
        'Queenstown': 'Queenstown.jpg',
        'Rotorua': 'Rotorua.jpg',
        'Hobbiton': 'Hobbiton.jpg',
        
        // India
        'Taj Mahal': 'Taj Mahal.jpg',
        'Jaipur (Pink City)': 'Jaipur.jpg',
        'Kerala Backwaters': 'Kerala Backwaters.jpg',
        'Leh-Ladakh': 'Leh Ladakh.jpg',
        'Bodh Gaya': 'Meenakshi Temple.jpg',
        'Bodhgaya': 'Meenakshi Temple.jpg',

        // India - North East
        'Kaziranga National Park': 'Kaziranga National Park.jpg',
        'Majuli Island': 'Majuli Island.jpg',
        'Ziro Valley': 'Ziro Valley.jpg',
        'Tawang Monastery': 'Tawang Monastery.jpg',
        'Araku Valley': 'Araku Valley.jpg',
        'Nalanda University Ruins': 'Nalanda University Ruins.jpg',
        'Barnawapara Wildlife Sanctuary': 'Barnawapara Wildlife Sanctuary.jpg',
        'Basilica of Bom Jesus': 'Basilica of Bom Jesus.jpg',
        'Rann of Kutch': 'Rann Of Kutch.jpg',
        'Chitrakote Falls': 'Chitrakote Falls.jpg',
        'Baga Beach': 'Baga Beach.jpg',
        'Somnath Temple': 'Somnath Temple.jpg',
        'Sultanpur Bird Sanctuary': 'Sultanpur Bird Sanctuary.jpg',
        'Spiti Valley': 'Spit Valley.jpg',
        'Baidhyanath Dham': 'Baidhyanath Dham.jpg',
        'Hampi': 'Hampi.jpg',
        'Khajuraho Temples': 'Khajuraho Temples.jpg',
        'Kanha National Park': 'Kanha National Park.jpg',
        'Ajanta Caves': 'Ajanta Caves.jpg',
        'Loktak Lake': 'Loktak Lake.jpg',
        'Kangla Fort': 'Kangla Fort.jpg',
        'Cherrapunji': 'Cherrapunji.jpg',
        'Living Root Bridges': 'Living Root Bridges.jpg',
        'Phawngpui National Park': 'Phawngpuri National Park.jpg',
        'Konark Sun Temple': 'Konark Sun Temple.jpg',
        'Reiek Heritage Village': 'Reiek Heritage Village.jpg',
        'Chilika Lake': 'Chilika Lake.jpg',
        'Hornbill Festival (Kisama Heritage Village)': 'Hornbill Festival.jpg',
        'Kohima War Cemetery': 'Kohima War Century.jpg',
        'Golden Temple': 'Golden Temple.jpg',
        'Wagah Border': 'Wagah Border.jpg',
        'Jaisalmer Desert Safari': 'Jaisalmer Desert Safari.jpg',
        'Meenakshi Temple': 'Meenakshi Temple.jpg',
        'Tsomgo Lake': 'Tsomgo Lake.jpg',
        'Ujjayanta Palace': 'ujjayanta palace.jpg',
        'Rumtek Monastery': 'Rumtek Monastery.jpg',
        'Ramappa Temple': 'Ramappa temple.jpg',
        'Varanasi Ghats': 'Varanasi ghats.jpg',
        'Valley of Flowers': 'Valley of flowers.jpg',
    };

    const imageName = imageMapping[place.name] || place.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';

    const placeUrl = `/place/${place.name}`;
    
    return (
        <a href={placeUrl} className="block transform transition-all duration-300 hover:scale-105">
            <div 
                className="relative overflow-hidden w-72 h-96 rounded-3xl cursor-pointer shadow-lg hover:shadow-xl"
                style={{
                    backgroundImage: `url('/places/${imageName}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 transition-all duration-300 hover:to-black/80"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {place.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{place.name}</h3>
                    <p className="text-lg opacity-90">{place.country}</p>
                </div>

                {/* Hover info */}
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <p className="text-white text-center text-sm leading-relaxed">
                        {place.Info}
                    </p>
                </div>
            </div>
        </a>
    )
}