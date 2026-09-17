"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const images = [
    "/hero1.png",
    "/hero2.png",
    "/hero3.png",
    "/hero4.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center"
    >
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-obsidian/50" />

      <div className="relative z-10 px-6 mb-22">
        <p className="font-mono text-xs tracking-widest text-orange-400 mb-4">
          CLASSIFIED ARCHIVE
        </p>

        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-ivory mb-4">
          Suraagh Dossier
        </h1>

        <p className="font-sans text-base md:text-xl text-aged-gray max-w-md mx-auto">
          Every case leaves a trail.
        </p>
      </div>

      <div className="absolute bottom-21 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "w-8 bg-ivory"
                : "w-2 bg-ivory/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}