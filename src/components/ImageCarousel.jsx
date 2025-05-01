import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 200px; /* Set a fixed width for the carousel */
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem;
`;

const CarouselImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  scroll-snap-align: start;
  flex: none;
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  /* Add fade effect */
  & {
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 50px;
      height: 100%;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
    }

    &::after {
      right: 0;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    }
  }
`;

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isPlaying && images.length > 0) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          let nextIndex = (prevIndex + 1) % images.length;
          if (carouselRef.current) {
            carouselRef.current.scrollTo({
              left: nextIndex * 210,
              behavior: 'smooth',
            });
          }
          return nextIndex;
        });
      }, 7000);
    } else {
      clearInterval(timer);
      setCurrentIndex(0);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
    }

    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  return (
    <div>
      <CarouselContainer ref={carouselRef}>
        {images.map((image, index) => (
          <CarouselImage
            key={index}
            src={image}
            alt={`Carousel Image ${index + 1}`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
            }}
          />
        ))}
      </CarouselContainer>
    </div>
  );
};

export default ImageCarousel;