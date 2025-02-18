import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// components
import './style.css';

const CustomCarousel = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const startSlide = () => {
    // clear timeout before invoking another setTimeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 3000);
  };

  // using setTimeout for change images
  useEffect(() => {
    startSlide();
  }, [current]);

  return (
    <div
      className="cs-slider-container"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => startSlide()}
    >
      {/* previous icon */}
      <AiOutlineLeft
        className="cs-slider-left-icon cs-slider-icon"
        onClick={prevSlide}
      />

      {/* iterating images */}
      <div
        className="cs-slider-img-container"
        style={{
          transform: `translateX(-${100 * current}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`cs-slider-img`}
            // temporary style for a fade-in and fade-out effect
            // because slider was not working as an infinite carousel with circular motion
            style={{
              opacity: current === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <img src={item} alt="slider" />
          </div>
        ))}
      </div>

      {/* next icon */}
      <AiOutlineRight
        className="cs-slider-right-icon cs-slider-icon"
        onClick={nextSlide}
      />

      <div className="cs-slider-indicator">
        {items.map((_, index) => (
          <button
            key={index}
            style={{ backgroundColor: index === current ? '#000' : '#fff' }}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
