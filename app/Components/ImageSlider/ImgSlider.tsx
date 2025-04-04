// components/ui/Slider.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// types/slider.ts
export interface SlideImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // For Next.js Image optimization
}

export interface SlideContent {
  title: string;
  description: string[];
}

export interface Slide extends SlideImage {
  content: SlideContent;
}

interface SliderProps {
  slides: Slide[]; // Now using the proper Slide type
  className?: string;
  showHeader?: boolean;
  headerLogo?: SlideImage; // Header logo uses the simpler SlideImage type
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showContent?: boolean;
}
export const Slider: React.FC<SliderProps> = ({
  slides,
  className = "",
  showHeader = true,
  headerLogo = {
    src: "/ImgSliderImg/logo.png",
    alt: "Logo",
    width: 50,
    height: 50,
  },

  showNavigation = true,
  showContent = true,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [diameter, setDiameter] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const calculateDiameter = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const calculatedDiameter = Math.sqrt(
          Math.pow(width, 2) + Math.pow(height, 2)
        );
        setDiameter(calculatedDiameter);
      }
    };

    calculateDiameter();
    window.addEventListener("resize", calculateDiameter);

    return () => window.removeEventListener("resize", calculateDiameter);
  }, []);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${className}`}>
      {/* Optional Header */}
      {showHeader && (
        <header className="w-[90vw] max-w-[1200px] h-[70px] mx-auto flex justify-between items-center relative z-10">
          <div
            className="relative"
            style={{ width: headerLogo.width, height: headerLogo.height }}
          >
            <Image
              src={headerLogo.src}
              alt={headerLogo.alt}
              width={headerLogo.width}
              height={headerLogo.height}
              className="object-contain"
              priority
            />
          </div>
          <nav>
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </nav>
        </header>
      )}

      {/* Slider Content */}
      <div
        className={`relative w-full h-full ${showHeader ? "mt-[-70px]" : ""}`}
      >
        {slides.map((slides, index) => (
          <div
            key={`${slides.src}-${index}`}
            className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 ${
              index === activeSlide
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Image with circular effect */}
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="absolute inset-0 flex justify-center items-center transition-all duration-1000"
                style={{
                  transform:
                    index === activeSlide
                      ? "rotate(0deg)"
                      : index > activeSlide
                      ? "rotate(60deg)"
                      : "rotate(-60deg)",
                  filter: index === activeSlide ? "blur(0px)" : "blur(30px)",
                }}
              >
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{
                    width: `${diameter}px`,
                    height: `${diameter}px`,
                  }}
                >
                  <Image
                    src={slides.src}
                    alt={slides.alt}
                    fill
                    className="object-cover"
                    priority={slides.priority}
                    quality={90}
                    style={{
                      transform:
                        index === activeSlide ? "scale(1)" : "scale(1.2)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Optional Content */}
            {showContent && slides.content && (
              <div
                className={`absolute top-[20%] left-1/2 -translate-x-1/2 w-auto max-w-full grid gap-20 text-left text-white text-xl uppercase font-poppins [text-shadow:_0_0_80px_#000] ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                } transition-opacity duration-1000 md:grid-cols-2`}
              >
                <h2
                  className={`text-[10em] font-bebas leading-[0.9em] ${
                    index === activeSlide
                      ? "translate-y-0"
                      : index > activeSlide
                      ? "translate-y-full"
                      : "-translate-y-full"
                  } transition-transform duration-1000 md:row-span-2`}
                >
                  {slides.content.title}
                </h2>
                {slides.content.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`${
                      i === slides.content.description.length - 1
                        ? "flex items-end pb-[25px]"
                        : ""
                    } text-sm md:text-base`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Optional Navigation Arrows */}
        {showNavigation && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[30px] w-[90vw] max-w-[1200px] flex justify-between">
            <button
              onClick={prevSlide}
              className="text-white cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4-4m-4 4 4 4"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="text-white cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
