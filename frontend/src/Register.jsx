import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import Navbar from './components/navbar';
import Footer from './components/footer';

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    phoneNo: data.phoneNo,
                    address: data.address,
                    street: data.street,
                    houseNo: data.houseNo,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
            // You can handle the response data here (e.g., display a success message)
        } catch (error) {
            console.error('There was an error registering the user:', error);
            // You can handle the error here (e.g., display an error message)
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="col-sm-10 col-lg-4 col-md-5 min-vh-100 d-flex flex-column justify-content-start align-items-center">
                <div className='w-100 mt-4'>
                    <h1>ELextra Register</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                {...register('firstName', { required: 'First name is required' })}
                            />
                            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                {...register('lastName', { required: 'Last name is required' })}
                            />
                            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="phoneNo">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                {...register('phoneNo', { required: 'Phone number is required' })}
                            />
                            {errors.phoneNo && <p className="text-danger">{errors.phoneNo.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                {...register('address', { required: 'Address is required' })}
                            />
                            {errors.address && <p className="text-danger">{errors.address.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter street"
                                {...register('street', { required: 'Street is required' })}
                            />
                            {errors.street && <p className="text-danger">{errors.street.message}</p>}
                        </Form.Group>

                        <Form.Group controlId="houseNo">
                            <Form.Label>House Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter house number"
                                {...register('houseNo', { required: 'House number is required' })}
                            />
                            {errors.houseNo && <p className="text-danger">{errors.houseNo.message}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mt-2'>
                            Register
                        </Button>
                    </Form>
                    <p>Registered! <a href="/login">Click Here</a></p>
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default RegistrationForm;
