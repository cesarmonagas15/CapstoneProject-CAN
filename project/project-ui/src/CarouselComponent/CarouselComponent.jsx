import React from 'react';
import { Carousel } from 'antd';
import './CarouselComponent.css';

const carouselData = [
  {
    image: 'https://raw.githubusercontent.com/cesarmonagas15/CapstoneProject-CAN/17ca467979d384743b935276d77823e24a559a54/project/project-ui/src/LandingPage/filters2.png',
    text: 'Slide 1 Text',
  },
  {
    image: 'https://example.com/image1.jpg',
    text: 'Slide 2 Text',
  },
  {
    image: 'https://example.com/image1.jpg',
    text: 'Slide 3 Text',
  }
];

const CustomSlide = ({ image, text }) => {
  return (
    <div className="slide-container">
      <img src={image} alt="Slide" className="slide-image" />
      <h3 className="slide-text">{text}</h3>
    </div>
  );
};

export default function CarouselComponent() {
  return (
    <Carousel autoplay>
      {carouselData.map((slide, index) => (
        <div key={index}>
          <CustomSlide image={slide.image} text={slide.text} />
        </div>
      ))}
    </Carousel>
  );
}
