import React, { useContext, useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';
import "./Slider.css";

const Slider = () => {
  const { reviews } = useContext(RentifyContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleNext = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % reviews.length);
      setAnimationClass('fade-in');
    }, 500); // Duration of fade-out animation
  };

  const handlePrevious = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
      setAnimationClass('fade-in');
    }, 500); // Duration of fade-out animation
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className='slider'>
      <div onClick={handlePrevious} className='left-arrow'>˂</div>
      <div className={animationClass}>
        <ReviewCard 
          key={currentIndex} 
          userName={reviews[currentIndex].userName} 
          review={reviews[currentIndex].review} 
        />
      </div>
      <div onClick={handleNext} className='right-arrow'>˃</div>
    </div>
  );
};

export default Slider;
