import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch, useAppSelector } from '../../redux';
import { editAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const EditShippingAddress = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { userInfo } = useAppSelector((state) => state.login); // 🔥 userInfo con ID
    const shippingAddresses = useAppSelector((state) => state.cart.shippingAddress);

    const addressToEdit = shippingAddresses.find((addr) => addr.id === id);

    const [formData, setFormData] = useState<AddressTypes>({
        id: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
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

        dispatch(
            editAddress({
                id: addressToEdit.id,
                newAddress: formData,
            })
        );

        // Redirigimos al perfil del usuario con su ID
        if (userInfo?.id) {
            navigate(`/profile/${userInfo.id}`);
        } else {
            navigate('/profile'); // fallback por si algo falla
        }
    };

    return (
        <FormContainer meta="edit shipping address" title="Edit Shipping Address">
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
                    Save Changes
                </Button>

                <Button
                    variant="secondary"
                    className="mt-2 w-full"
                    onClick={() => navigate('/shipping-address')}
                >
                    Cancel
                </Button>
            </Form>
        </FormContainer>
    );
};

export default EditShippingAddress;
