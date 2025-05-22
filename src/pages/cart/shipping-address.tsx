import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch, useAppSelector } from '../../redux';
import { saveAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const ShippingAddress = () => {
  const shippingAddresses = useAppSelector((state) => state.cart.shippingAddress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddressTypes>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveAddress(formData));
    navigate('/checkout');
  };

  useEffect(() => {
    if (shippingAddresses?.length > 0) {
      // opcional: navigate('/checkout');
    }
  }, [shippingAddresses, navigate]);

  return (
    <FormContainer meta="shipping address" title="Shipping Address">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={formData.address}
            onChange={onChange}
            name="address"
            placeholder="Enter your address"
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={formData.city}
            onChange={onChange}
            name="city"
            placeholder="Enter your city"
            required
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={formData.postalCode}
            onChange={onChange}
            name="postalCode"
            placeholder="Enter your postal code"
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={formData.country}
            onChange={onChange}
            name="country"
            placeholder="Enter your country"
            required
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          variant="outline-none"
          type="submit"
          className="mt-4 w-full"
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddress;
