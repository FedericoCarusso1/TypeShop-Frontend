import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrencry } from "../utils/helper";
import { ReviewTypes } from "../utils/interfaces";
import ImageLazy from "./UI/lazy-image";

export type Product = {
  id: number | string;
  title: string;
  price: number;
  _images: { [key: string]: string }[];
  url: string;
  _category: { name: string; id: string }[];
  brand: string;
  description: string;
  qty: number;
  createdAt: Date;
  reviews: ReviewTypes[];
};

const isNew = () => Math.random() < 0.5;

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="h-100 border border-dark-subtle my-2">
      <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
        {/* Imagen */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#f8f9fa",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageLazy
            imageUrl={product?._images[0]?.url}
            className="my-5"
            style={{
              height: "180px",
              width: "100%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          {isNew() && (
            <Badge
              bg="warning"
              text="dark"
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
              }}
            >
              Nuevo
            </Badge>
          )}
        </div>

        {/* Contenido */}
        <Card.Body className="d-flex flex-column justify-content-between" style={{ minHeight: "150px" }}>
          <Card.Title className="fs-6 fw-bold text-uppercase text-truncate mb-1">
            {product.title}
          </Card.Title>

          <div className="d-flex align-items-center" style={{ minHeight: "40px" }}>
            <Card.Text
              className="text-muted small text-truncate mb-0"
              style={{
                overflow: "hidden",
                textAlign: "start",
              }}
              title={product.description}
            >
              {product.description}
            </Card.Text>
          </div>

          <Card.Text className="fw-bold fs-5 text-success mt-1">
            {formatCurrencry(product.price)}
          </Card.Text>
        </Card.Body>


      </Link>
    </Card>
  );
};

export default ProductCard;
