import React, { useState } from 'react';
import ImageCard from './ImageCard';
import '../css/ImageSlider.css';

const ImageSlider = ({ images, currentIndex, setCurrentIndex, handleUpdatePhoto, handleDeletePhoto }) => {

    // const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionDirection, setTransitionDirection] = useState('none'); // none, shrinking, growing

    
    // const visibleImages = images.slice(currentIndex, currentIndex + 3);

    const handlePrev = () => {
        if (currentIndex > 2) {
            console.log('prev');
            setTransitionDirection('shrinking');
            setTimeout(() => {
                setTransitionDirection('none');
                setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 3);
                setTransitionDirection('growing');
                setTimeout(() => {
                    setTransitionDirection('none');
                }, 500);
            }, 500);
            

        }
    };

    const handleNext = () => {
        if(images.length < 3) return;
            setTransitionDirection('shrinking');
            setTimeout(() => {
                setTransitionDirection('none');
                setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 3)
                setTransitionDirection('growing');
                setTimeout(() => {
                    setTransitionDirection('none');
                }, 500);
            }, 500)
    };


    return (
        <div className="slider-container">
            <button  className='img-s-button' onClick={handlePrev}  style={{ display: currentIndex === 0 ? 'none' : 'block' }} >
                <img src="/img/leftArrow.png" alt="&lt;" />
            </button>
            <div className="slider">
                {images.map((img, index) => (
                    <ImageCard 
                    handleUpdatePhoto={handleUpdatePhoto}
                    handleDeletePhoto={handleDeletePhoto}
                        img={img}
                        key={index} 
                        className={transitionDirection}
                        // onClick={() => onClick(img)}
                    />
                ))}
            </div>
            <button className='img-s-button' onClick={handleNext}  style={{ display: images.length < 3 ? 'none' : 'block' }}>
                <img src="/img/rightArrow.png" alt="&gt;"/>
            </button>
        </div>
    );
};

export default ImageSlider;
