import React, { useState, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LaptopDetail = () => {
    const [laptop, setLaptop] = useState([]);
    const url = window.location.pathname;
    const productId = url.substring(url.lastIndexOf("/") + 1);
    const [value, setValue] = useState(1);

    const decreaseValue = () => {
        if (value > 1) {
            setValue((prevValue) => prevValue - 1);
        }
    };

    const increaseValue = () => {
        setValue((prevValue) => prevValue + 1);
    };
    useEffect(() => {
        const fetchLaptop = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/products/get/${productId}`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );
                const data = await response.json();
                setLaptop(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching laptop:", error);
            }
        };

        fetchLaptop();
    }, []);
    const addToCart = (productId, value) => {
        fetch('http://127.0.0.1:8000/api/products/check/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId,
                quantity: value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success(data.message);
                const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
                if (data.detail && data.detail.id) {
                    if (existingCart[data.detail.id]) {
                        existingCart[data.detail.id].order += data.detail.order;
                    } else {
                        existingCart[data.detail.id] = data.detail;
                    }
                    localStorage.setItem('cart', JSON.stringify(existingCart));
                }
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add to cart');
            });
    };
    return (
        <div className="container mt-3">
            <Breadcrumb>
                <Breadcrumb.Item href="/" className="text-decoration-none">Home</Breadcrumb.Item>
                {laptop.category && laptop.category.name ? (<Breadcrumb.Item active>{laptop.category.name}</Breadcrumb.Item>) : (<p>Loading..</p>)}
            </Breadcrumb>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    {laptop.details && laptop.details.images ? (
                        laptop.details.images.map((image, index) => (
                            <img
                                className="d-block img-fluid"
                                src={`http://127.0.0.1:8000${image}`}
                                alt={laptop.name}
                                style={{ maxHeight: "400px" }}
                                key={index}
                            />
                        ))
                    ) : (
                        <p>Loading images...</p>
                    )}
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    {laptop && laptop.details ? (
                        <>
                            <h5>{laptop.name}</h5>
                            <p>{laptop.details.description}</p>
                            <h5 className="text-danger"><b className="text-black">Price:</b> Rs.{laptop.price}</h5>
                            <h5 className="text-danger"><b className="text-black">Brand:</b> {laptop.category && laptop.category.name}</h5>
                            <div className="input-group d-flex align-items-center mb-3" style={{ width: '10rem' }}>
                                <label htmlFor="quantity"><h5 className="text-black">Qty: </h5></label>
                                <span onClick={decreaseValue} className="btn btn-danger ms-2">-</span>
                                <input type="text" value={value} className="form-control" max={laptop.quantity} readOnly id="quantity" />
                                <span onClick={increaseValue} className="btn btn-danger">+</span>
                            </div>
                            <button className="btn btn-danger w-100" onClick={() => addToCart(laptop.id, value)}>
                                Add To Cart
                            </button>
                            <div className="mt-2">
                                <p><b>Key features</b></p>
                                <ul className="list-group">
                                    <li className="list-group-item">Processor: {laptop.details.processor}</li>
                                    <li className="list-group-item">RAM: {laptop.details.memory}</li>
                                    <li className="list-group-item">Storage: {laptop.details.storage}</li>
                                    <li className="list-group-item">Display: {laptop.details.display_size} resolution</li>
                                    <li className="list-group-item">Graphic: {laptop.details.graphics_card}</li>
                                    <li className="list-group-item">Operating System: {laptop.details.operating_system}</li>
                                </ul>
                            </div>
                        </>
                    ) : (<p>Loading...</p>)}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LaptopDetail;