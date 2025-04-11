'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        '/china.jpg',
        '/kenya.jpg',
        '/bali.jpg',
        '/tokyo.jpg',
        '/hampi.jpg',
        '/colloseum.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="absolute inset-0 w-full h-full">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
} 