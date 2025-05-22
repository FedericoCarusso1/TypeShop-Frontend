import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch } from '../../redux';
import { saveAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const ShippingAddress = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddressTypes>({
    street: '',
    streetNumber: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    reference: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(saveAddress(formData)).unwrap();
      navigate('/checkout');
    } catch (err: any) {
      setError(err.message || 'Error al guardar la dirección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer meta="shipping address" title="Dirección de Envío">
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Group controlId="street">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                name="street"
                value={formData.street}
                onChange={onChange}
                placeholder="Ej: Avenida Siempre Viva"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="streetNumber">
              <Form.Label>Número</Form.Label>
              <Form.Control
                name="streetNumber"
                value={formData.streetNumber}
                onChange={onChange}
                placeholder="Ej: 742"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="Ej: Springfield"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>Provincia / Estado</Form.Label>
              <Form.Control
                name="state"
                value={formData.state}
                onChange={onChange}
                placeholder="Ej: Provincia de Buenos Aires"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="postalCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                name="postalCode"
                value={formData.postalCode}
                onChange={onChange}
                placeholder="Ej: 1234"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="country">
              <Form.Label>País</Form.Label>
              <Form.Control
                name="country"
                value={formData.country}
                onChange={onChange}
                placeholder="Ej: Argentina"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="reference" className="mb-3">
          <Form.Label>Referencia</Form.Label>
          <Form.Control
            name="reference"
            value={formData.reference}
            onChange={onChange}
            placeholder="Ej: Casa con rejas verdes, al lado del kiosco"
            as="textarea"
            rows={2}
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Dirección'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddress;
