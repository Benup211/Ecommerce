import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);

            // Save responseData.id to localStorage
            localStorage.setItem('id', responseData.id);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            console.error('There was an error logging in:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="col-sm-10 col-lg-4 col-md-5 min-vh-100 d-flex flex-column justify-content-start align-items-center">
                <div className='w-100 mt-4'>
                    <h1>Elextra Login</h1>
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

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mt-2'>
                            Login
                        </Button>
                    </Form>
                    <p>Not registered! <a href="/register">Click Here</a></p>
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default LoginForm;
