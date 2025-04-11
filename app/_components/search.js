'use client';
import { useState } from 'react';

export default function Search(){
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Here you can implement your search logic
        console.log('Searching for:', searchQuery);
        // You can add API calls or other search functionality here
    };

    return(      
        <div className="flex items-center justify-center p-5 relative z-20 w-120 max-w-2xl search">
            <div className="rounded-lg bg-white/90 backdrop-blur-md p-5 shadow-xl w-full transform transition-all duration-300 hover:shadow-2xl">
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
                        placeholder="Search destinations..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        type="button" 
                        className="bg-orange-500 px-6 py-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-orange-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}