'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage, languages } from '../context/LanguageContext';

export default function LanguageSelector() {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-orange-500 transition-colors duration-300"
            >
                <span className="text-sm font-medium">{languages[language]}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                    {Object.entries(languages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => {
                                changeLanguage(code);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 transition-colors duration-200 ${
                                language === code ? 'text-orange-500 font-medium' : 'text-gray-700'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
} 