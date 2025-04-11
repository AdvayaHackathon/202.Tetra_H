'use client';
import { places } from "../data/country"
import Card from "../_components/Card"
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from '../_components/LanguageSelector'

export default function Started(){
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState(places);
    const [availableTags, setAvailableTags] = useState([]);
    const { translations } = useLanguage();

    // Extract all unique tags from places and add International/National categorization
    useEffect(() => {
        const tags = new Set();
        // Only add commonly used tags that have translations
        const commonTags = [
            'summer', 'beach', 'cultural', 'historical', 'adventurous', 'natural',
            'architectural', 'scenic', 'romantic', 'party', 'relaxation', 'religious',
            'urban', 'entertainment', 'mystery', 'luxury', 'wildlife', 'ancient',
            'archaeological', 'family', 'educational', 'winter', 'nature', 'spiritual',
            'mountain', 'International', 'National'
        ];
        
        commonTags.forEach(tag => {
            if (translations[tag]) {
                tags.add(tag);
            }
        });
        
        setAvailableTags([...tags]);
    }, [translations]);

    const handleSearch = (query) => {
        if (query && !filters.includes(query)) {
            setFilters([...filters, query]);
            setSearchQuery('');
        }
    };

    const removeFilter = (filterToRemove) => {
        setFilters(filters.filter(filter => filter !== filterToRemove));
    };

    const handleTagClick = (tag) => {
        if (!filters.includes(tag)) {
            setFilters([...filters, tag]);
        }
    };

    useEffect(() => {
        if (filters.length === 0) {
            setFilteredPlaces(places);
            return;
        }

        const filtered = places.filter(place => {
            // Check if place matches all selected filters
            return filters.every(filter => {
                const lowerFilter = filter.toLowerCase();
                
                // Handle International/National categorization
                if (filter === 'International') {
                    return place.country !== 'India';
                }
                if (filter === 'National') {
                    return place.country === 'India';
                }
                
                // Handle regular tags
                return place.tags.some(tag => 
                    tag.toLowerCase() === lowerFilter
                );
            });
        });
        setFilteredPlaces(filtered);
    }, [filters]);

    return(
        <div className="min-h-screen w-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <a href="/" className="text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                {translations.home}
                            </a>
                            <a href="/MakeTrip" className="text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                {translations.popularDestinations}
                            </a>
                        </div>
                        <div className="flex-1 max-w-xl mx-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                                    placeholder={translations.searchPlaceholder}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                />
                                <button
                                    onClick={() => handleSearch(searchQuery)}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
                                >
                                    {translations.search}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LanguageSelector />
                            <a href="#" className="text-gray-800 hover:text-orange-500 transition-colors duration-300">
                                {translations.aboutUs}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">{translations.popularDestinations}</h1>
                
                {/* Available Tags */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {availableTags.map((tag, index) => (
                        <button
                            key={index}
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                filters.includes(tag)
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-orange-100 hover:text-orange-800'
                            }`}
                        >
                            {translations[tag]}
                        </button>
                    ))}
                </div>

                {/* Active Filters */}
                {filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {filters.map((filter, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full"
                            >
                                <span>{translations[filter]}</span>
                                <button
                                    onClick={() => removeFilter(filter)}
                                    className="text-orange-600 hover:text-orange-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {filteredPlaces.map((place, index) => (
                        <Card key={index} place={place} />
                    ))}
                </div>

                {filteredPlaces.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        {translations.noResults}
                    </div>
                )}
            </div>
        </div>
    )
}