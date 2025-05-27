import { Button, Form } from 'react-bootstrap';
import ModalContainer from '../UI/modal-container';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authAxios from '../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import { ChangeEvent, useState } from 'react';
import { baseUrl } from '../../utils/helper';
import Select from 'react-select';
import { useAppSelector } from '../../redux';

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: (value: boolean) => void;
};

type OptionType = { label: string; value: string };

type FormValues = {
  title: string;
  image: string[]; // Esto en realidad ya no se usa como array, pero lo dejamos por compatibilidad
  category: OptionType[];
  brand: string;
  price: number;
  description: string;
};

const ProductModal = ({ show, handleClose, setRefresh }: Props) => {
  const [image, setImage] = useState<string>('');

  const categoryOptions = useAppSelector((state) =>
    state.categories.categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    category: Yup.array()
      .min(1, 'Select at least one category')
      .required('Category is required'),
    brand: Yup.string().required('Brand is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      authAxios.post('/uploads/image', formData).then((res) => {
        if (res.data) {
          setImage(`${baseUrl}${res.data}`);
        }
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      image,
      category: data.category.map((c) => c.value),
    };

    authAxios
      .post('/products', payload)
      .then(() => {
        toast.success('Product has been created');
        setRefresh(true);
        handleClose();
      })
      .catch((err) => {
        toast.error(setError(err));
        console.error(err);
      });
  };

  return (
    <ModalContainer title="Add Product" handleClose={handleClose} show={show}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="RTX 4090"
            {...register('title')}
            className={errors.title ? 'is-invalid' : ''}
          />
          <p className="invalid-feedback">{errors.title?.message}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={onChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="MSI"
            {...register('brand')}
            className={errors.brand ? 'is-invalid' : ''}
          />
          <p className="invalid-feedback">{errors.brand?.message}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={categoryOptions}
                classNamePrefix="react-select"
              />
            )}
          />
          <p className="invalid-feedback d-block">
            {(errors.category as any)?.message}
          </p>
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="200.00"
            {...register('price')}
            className={errors.price ? 'is-invalid' : ''}
          />
          <p className="invalid-feedback">{errors.price?.message}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            {...register('description')}
            className={errors.description ? 'is-invalid' : ''}
          />
          <p className="invalid-feedback">{errors.description?.message}</p>
        </Form.Group>

        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          type="submit"
          className="mt-3 w-full text-white"
        >
          Add
        </Button>
      </Form>
    </ModalContainer>
  );
};

export default ProductModal;
