import { Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrencry } from "../utils/helper";
import { ReviewTypes } from "../utils/interfaces";
import ImageLazy from "./UI/lazy-image";

export type Product = {
  id: number | string;
  title: string;
  price: number;
  image: string;
  category: string;
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
        <div
          style={{
            position: "relative",
            backgroundColor: "#f8f9fa",
            padding: 0, // ✅ Eliminamos padding que rompía el grid
            display: "flex", // ✅ Centramos la imagen
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageLazy
            imageUrl={product.image}
            className="my-5"
            style={{
              height: "180px",
              width: "100%",
              objectFit: "contain", // ✅ Cambio a "contain" para que no se corte
              borderRadius: "8px",
            }}
          />
          {isNew() && <Badge
            bg="warning"
            text="dark"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
          >
            Nuevo
          </Badge>}
        </div>

        <Card.Body>
          <Card.Title className="fs-6 fw-bold text-uppercase text-truncate">
            {product.title}
          </Card.Title>
          <Card.Text className="fw-bold fs-5 text-success">
            {formatCurrencry(product.price)}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
