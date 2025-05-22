import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default-layout';
import Loader from '../../components/UI/loader';
import TableContainer from '../../components/UI/table-contrainer';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getUserBydId } from '../../redux/users/user-details';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authAxios from '../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import { getUserOrder } from '../../redux/orders/user-orders';
import { formatCurrencry, getDate } from '../../utils/helper';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';

type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.userDetails);
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const { orders, loading: orderLoading } = useAppSelector(
    (state) => state.userOrder
  );

  const { id } = useParams();
  const [refresh, setRefresh] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Confirm Password does not match'
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    const update = {
      name: data.name,
      email: data.email,
      password: data.password === '' ? null : data.password,
    };
    authAxios
      .put(`/users/${user?.id}`, update)
      .then(() => {
        toast.success('User has been updated');
        setRefresh((prev) => !prev);
      })
      .catch((err) => toast.error(setError(err)));
  };

  const onDelete = (id: string | number) => {
    if (window.confirm('Are you sure?')) {
      authAxios
        .delete(`/orders/${id}`)
        .then((res) => {
          toast.success(res.data);
          setRefresh((prev) => !prev);
        })
        .catch((e) => toast.error(setError(e)));
    }
  };

  useEffect(() => {
    dispatch(getUserBydId());
    dispatch(getUserOrder());
  }, [dispatch, id, refresh]);

  const cols = ['Order id', 'Price', 'Address', 'Paid', 'Date', 'Options'];

  return (
    <DefaultLayout title={`${user?.name} profile`}>
      <Container className="py-4">
        {loading || !user ? (
          <Loader />
        ) : (
          <Row className="gy-4">
            <Col lg={4} md={6} xs={12}>
              <h2 className="mb-4">User Profile</h2>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...register('name', { value: user?.username })}
                        placeholder="Enter name"
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        {...register('email', { value: user?.email })}
                        placeholder="Enter email"
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        {...register('password')}
                        type="password"
                        placeholder="********"
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="********"
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      style={{ backgroundColor: '#e03a3c', color: '#fff' }}
                      variant="outline-none"
                      type="submit"
                      className="w-100"
                    >
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Shipping Addresses</h5>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate('/shipping-address')}
                  >
                    + Add
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {shippingAddress.length === 0 ? (
                    <ListGroup.Item className="text-center text-muted py-3 px-3">
                      No shipping addresses saved
                    </ListGroup.Item>
                  ) : (
                    shippingAddress.map((addr, i) => (
                      <ListGroup.Item key={i} className="py-3 px-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div><strong>Address:</strong> {addr.address}</div>
                          <div><strong>City:</strong> {addr.city}</div>
                          <div><strong>Postal Code:</strong> {addr.postalCode}</div>
                          <div><strong>Country:</strong> {addr.country}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => navigate(`/shipping-address/edit/${addr.id}`)} // o como armes la ruta de edición
                        >
                          Edit
                        </Button>
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card>
            </Col>

            <Col lg={8} md={6} xs={12}>
              <h2 className="mb-4">Your Orders</h2>
              <TableContainer cols={cols}>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{formatCurrencry(order?.totalPrice)}</td>
                      <td>{order?.shippingAddress?.address}</td>
                      <td>{order.isPaid ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                      <td>{getDate(order?.createdAt)}</td>
                      <td>
                        <Link to={`/orders/${order.id}`} className="btn btn-sm btn-secondary me-2">
                          <GrView />
                        </Link>
                        <Button onClick={() => onDelete(order.id)} variant="danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </TableContainer>
            </Col>
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default Profile;
