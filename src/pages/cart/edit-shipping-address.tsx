import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch, useAppSelector } from '../../redux';
import { editAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const EditShippingAddress = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.login);
    const shippingAddresses = useAppSelector((state) => state.cart.shippingAddress);
    const addressToEdit = shippingAddresses.find((addr) => addr.id === id);

    const [formData, setFormData] = useState<AddressTypes>({
        id: '',
        street: '',
        streetNumber: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        reference: '',
    });

    useEffect(() => {
        if (!addressToEdit) {
            navigate('/shipping-address');
        } else {
            setFormData(addressToEdit);
        }
    }, [addressToEdit, navigate]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!addressToEdit) return;

        dispatch(editAddress({ id: addressToEdit.id, newAddress: formData }));

        if (userInfo?.id) {
            navigate(`/profile/${userInfo.id}`);
        } else {
            navigate('/profile');
        }
    };

    return (
        <FormContainer meta="edit shipping address" title="Edit Shipping Address">
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col md={8}>
                        <Form.Group controlId="street" className="mb-3">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                value={formData.street}
                                onChange={onChange}
                                name="street"
                                placeholder="Avenida Siempre Viva"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="streetNumber" className="mb-3">
                            <Form.Label>Street Number</Form.Label>
                            <Form.Control
                                value={formData.streetNumber}
                                onChange={onChange}
                                name="streetNumber"
                                placeholder="742"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="city" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        value={formData.city}
                        onChange={onChange}
                        name="city"
                        placeholder="Springfield"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="state" className="mb-3">
                    <Form.Label>State / Province</Form.Label>
                    <Form.Control
                        value={formData.state}
                        onChange={onChange}
                        name="state"
                        placeholder="Provincia de Buenos Aires"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="postalCode" className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        value={formData.postalCode}
                        onChange={onChange}
                        name="postalCode"
                        placeholder="1234"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="country" className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        value={formData.country}
                        onChange={onChange}
                        name="country"
                        placeholder="Argentina"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="reference" className="mb-4">
                    <Form.Label>Reference</Form.Label>
                    <Form.Control
                        value={formData.reference}
                        onChange={onChange}
                        name="reference"
                        placeholder="Casa con rejas verdes, al lado del kiosco"
                    />
                </Form.Group>

                <Row className="mt-4">
                    <Col xs={6}>
                        <Button
                            style={{ backgroundColor: '#e03a3c', color: '#fff' }}
                            variant="outline-none"
                            type="submit"
                            className="w-100"
                        >
                            Save Changes
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button
                            variant="secondary"
                            className="w-100"
                            onClick={() => navigate('/shipping-address')}
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default EditShippingAddress;
