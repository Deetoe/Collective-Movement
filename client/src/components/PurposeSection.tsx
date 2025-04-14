// src/components/PurposeSection.tsx
import { useState, useEffect } from 'react';
import runningImage1 from '../assets/images/running1.jpg';
import runningImage2 from '../assets/images/running2.jpg';
import runningImage3 from '../assets/images/running3.jpg';

const images: string[] = [runningImage1, runningImage2, runningImage3];

export default function PurposeSection() {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 my-16 px-6 max-w-7xl mx-auto">
      {/* Our Purpose Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-pink-600">
          Our Purpose
        </h2>
        <p className="text-lg md:text-2xl text-gray-700 font-medium leading-relaxed">
          Join us to move, connect, and thrive! <br />
          Our exercise club is dedicated to empowering individuals through fitness,
          <br className="hidden md:inline" />
          fostering community, and achieving wellness together.
        </p>
      </div>

      {/* Image Slideshow */}
      <div className="md:w-1/2 w-full border-4 border-pink-500 rounded-lg shadow-lg overflow-hidden">
        <img
          src={images[currentImage]}
          alt={`Purpose ${currentImage}`}
          className="w-full h-64 md:h-96 object-cover transition-all duration-700"
        />
      </div>
    </section>
  );
}
