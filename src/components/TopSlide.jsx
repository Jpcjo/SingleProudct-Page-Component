import React, { useState, useEffect } from "react";

const texts = [
  "Wool Loungers. Walk on clouds.",
  "Free Delivery On Orders Over $100.",
  "absolutely. free returns.",
  "Introducing AfterPay. Shop now. Pay Late.",
];

const TopSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = prevSlide + direction;
        if (nextSlide >= texts.length - 1 || nextSlide < 1) {
          setDirection(-direction); // Reverse direction at the ends
          return prevSlide + direction;
        }
        return nextSlide;
      });
    }, 6000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [direction]);

  //   useEffect(() => {
  //     const slideTimer = setInterval(() => {
  //       setCurrentSlide((prevSlide) => (prevSlide + 1) % texts.length);
  //     }, 4500);

  //     return () => {
  //       clearInterval(slideTimer);
  //     };
  //   }, []);

  return (
    <div className="relative w-screen  h-12 bg-black text-white overflow-hidden font-semibold uppercase ">
      <div
        className="text-xs absolute w-full top-0 left-0 h-12 flex md:text-sm transition-transform"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 1s ease-in-out",
        }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className="min-w-[100vw] h-12 flex items-center justify-center"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSlide;
