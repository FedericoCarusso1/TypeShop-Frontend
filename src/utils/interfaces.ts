import { Product } from '../components/product-card';

export interface Ordertypes {
  id: string;
  user: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  cartItems: Product[];
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
}

export type ReviewTypes = {
  id: string;
  createdAt: Date;
  rating: number;
  comment: string;
  name: string;
  user: string;
};

export type User = {
  id: string;
  // name: {firstname: string, lastname: string};
  name: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
};

export interface AddressTypes {
  id: string;
  street: string;
  streetNumber?: string; // Este no está en Sequelize, podés removerlo si no lo vas a usar más
  city: string;
  state?: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
  reference?: string;
}



