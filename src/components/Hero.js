import React, { useEffect, useState } from "react";

const slides = [
  "https://images.pexels.com/photos/8392576/pexels-photo-8392576.jpeg",
  "https://images.pexels.com/photos/7722867/pexels-photo-7722867.jpeg",
  "",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden"
    >
      <img
        src={slides[index]}
        alt="Clinigoal Hero"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
      <div className="relative z-10 text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse">Welcome to Clinigoal</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Empowering medical learning through innovation, technology, and excellence.
        </p>
        <a
          href="#courses"
          className="bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
        >
          Explore Courses
        </a>
      </div>
    </section>
  );
};

export default Hero;
