import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import items from '@helpers/projectsData.js';
import styles from './Carousel.module.css';
import CarouselItem from '../CarouselItem/CarouselItem';

function Carousel() {
  const [carrouselScroll, setCarrouselScroll] = useState(0);
  const setCarouselYPosition = useState(null)[1];

  const carouselRef = useRef();

  const handleScroll = () => {
    setCarouselYPosition((yPosition) => {
      const valueToScroll = (carouselRef.current.getBoundingClientRect().top
     - yPosition) * 3;
      setCarrouselScroll((val) => {
        const newValue = val + valueToScroll;

        return newValue;
      });
      return carouselRef.current.getBoundingClientRect().top;
    });
  };

  useEffect(() => {
    setCarouselYPosition(carouselRef.current.getBoundingClientRect().top);
  }, []);

  const calculateCarouselSpin = (scrollValue) => {
    if (scrollValue > 0) return 0;
    const maxSpin = -((items.length - 1) * 60);
    if (scrollValue < maxSpin) return maxSpin;
    return scrollValue;
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <h1 className={styles.pageTitle}>Mis Proyectos</h1>
      <div
        className={styles.carousel}
        style={{
          transform: `rotateY(${calculateCarouselSpin(carrouselScroll / 8)}deg)`,
        }}
        ref={carouselRef}
      >
        {items.map((item, index) => (
          <CarouselItem
            id={index}
            title={item.title}
            image={item.images[0]}
            style={{
              transform: `rotateY(${index * 60}deg) translateZ(250px)`,
              marginTop: index === 0 ? 0 : '-70px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

Carousel.propTypes = {};

Carousel.defaultProps = {};
