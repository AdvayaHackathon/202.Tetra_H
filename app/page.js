'use client';
import Button from "./_components/button"
import Slideshow from "./_components/slideshow"
import { places } from "./data/country"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './context/LanguageContext';
import LanguageSelector from './_components/LanguageSelector';

export default function Home(){
    const [scrollPosition, setScrollPosition] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();
    const { translations } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
            document.documentElement.style.setProperty('--scroll', position);
            
            const page1 = document.querySelector('.page-1');
            if (position > 100) {
                page1?.classList.add('animate');
            } else {
                page1?.classList.remove('animate');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = places.filter(place => 
            place.name.toLowerCase().includes(lowerQuery) ||
            place.country.toLowerCase().includes(lowerQuery) ||
            place.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
        
        setSearchResults(results);
        setShowResults(true);
    };

    const handleResultClick = (place) => {
        router.push(`/place/${encodeURIComponent(place.name)}`);
        setShowResults(false);
        setSearchQuery('');
    };

    return(
        <div className="min-h-screen w-screen overflow-x-hidden">
            <div className="relative h-screen w-screen page-1 flex flex-col items-center justify-center">
                <Slideshow />
                <div className="relative z-20 flex flex-col items-center gap-8 px-4">
                    <h1 className="app-name text-7xl md:text-8xl text-center text-white drop-shadow-lg">RouteVerse</h1>
                    <p className="app-tagline mt-5 text-2xl md:text-3xl font-montserrat text-center text-white/90 max-w-2xl drop-shadow-md">{translations.tagline}</p>
                    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                        <div className="relative w-full">
                            <div className="flex items-center justify-center relative z-20 w-full">
                                <div className="search rounded-lg bg-white/90 backdrop-blur-md p-5 shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl">
                                    <div className="flex w-full">
                                        <div className="flex w-12 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-2">
                                            <svg 
                                                viewBox="0 0 20 20" 
                                                className="w-5 h-5 fill-gray-500"
                                            >
                                                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                            </svg>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white pl-4 text-base font-semibold outline-0 text-gray-800 placeholder-gray-400" 
                                            placeholder={translations.searchPlaceholder}
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                handleSearch(e.target.value);
                                            }}
                                            onKeyDown={(e) => e.key === 'Enter' && searchResults.length > 0 && handleResultClick(searchResults[0])}
                                        />
                                        <button 
                                            type="button" 
                                            className="bg-orange-500 px-6 py-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-orange-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                                            onClick={() => searchResults.length > 0 && handleResultClick(searchResults[0])}
                                        >
                                            {translations.search}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                                    {searchResults.map((place, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleResultClick(place)}
                                            className="p-4 hover:bg-orange-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                        >
                                            <div className="font-semibold text-gray-800">{place.name}</div>
                                            <div className="text-sm text-gray-600">{place.country}</div>
                                            <div className="flex gap-2 mt-2">
                                                {place.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a href="http://localhost:3000/Started">
                            <Button text={translations.startPlanning} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
