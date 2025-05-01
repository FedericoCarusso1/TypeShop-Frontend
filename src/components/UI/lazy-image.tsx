import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  className?: string;
  imageUrl?: string;
  style?: React.CSSProperties;
};

const ImageLazy = ({ className, imageUrl, style }: Props) => {
  return (
    <LazyLoadImage
      src={imageUrl}
      className={className}
      style={style}
      alt="Carousel image"
      effect="blur"
    />
  );
};

export default ImageLazy;
