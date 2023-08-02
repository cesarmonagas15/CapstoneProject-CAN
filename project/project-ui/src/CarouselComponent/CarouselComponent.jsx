import React from 'react';
import { Carousel } from 'antd';
import './CarouselComponent.css';

const CustomSlide = ({ image, text, title }) => {
  return (
    <div className="slide-container">
      <img src={image} alt="Slide" className="slide-image" />
      <h3 className="slide-title">{title}</h3>
      <p className="slide-text">{text}</p>
    </div>
  );
};

export default function CarouselComponent({carouselData}) {
  return (
    <Carousel autoplay>
      {carouselData.map((slide, index) => (
        <div key={index}>
          <CustomSlide image={slide.image} text={slide.text} title={slide.title}/>
        </div>
      ))}
    </Carousel>
  );
}
