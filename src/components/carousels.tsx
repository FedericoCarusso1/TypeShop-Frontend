import { useState } from "react";
import { Carousel } from "react-bootstrap";
import ImageLazy from "./UI/lazy-image";

const images = [
  "https://items.templately.com/item-d34fcdded1e93d1c42f5283981a464f2/runway-hero-section-for-gutenberg-banner-6WRqMR4.jpg",
  "https://static.vecteezy.com/system/resources/previews/053/875/354/non_2x/brightly-colored-clothing-displays-attract-shoppers-in-a-modern-retail-store-during-the-afternoon-photo.jpeg",
  "https://d2vyhi5ouo1we3.cloudfront.net/force_jpg/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vZGlyZWN0L3ZYSll3MzFEM2RiTW8wZ0Q2UC90ZW1wbGF0ZXMvMDAwLzAwMC8wODUvOTQ1L2tZNFF2N0Q4VmdqTFpCMHFtUC9mMDIwYzM5ZmY3OTJmYWZhM2RhZTI1MGYyNWUxZmY5N2RjNDY5NjZkLnBuZw==/image.jpg",
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
