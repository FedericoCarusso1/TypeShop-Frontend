import { useState } from "react";
import { Carousel } from "react-bootstrap";
import ImageLazy from "./UI/lazy-image";

const images = [
  "/images/carousels/1.jpg",
  "/images/carousels/2.webp",
  "/images/carousels/3.webp",
];

const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="w-100 d-flex justify-content-center"
    >
      {images.map((url, idx) => (
        <Carousel.Item key={idx} className="carousel__item">
          <ImageLazy className="carousel__image w-100" imageUrl={url} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carousels;
