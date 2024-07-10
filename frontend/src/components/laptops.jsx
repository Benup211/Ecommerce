import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Laptops = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [brand, setBrand] = useState(0);
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products/categories/', {
                    headers: {
                        accept: 'application/json',
                    },
                });
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const priceFrom = parseInt(urlParams.get('price_from') || 0, 10);
        const priceTo = parseInt(urlParams.get('price_to') || 0, 10);
        const brand = parseInt(urlParams.get('brand') || 0);

        setPriceFrom(priceFrom);
        setPriceTo(priceTo);
        setBrand(brand);

        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/all/?price_from=${priceFrom}&price_to=${priceTo}&brand=${brand}`, {
                    headers: {
                        accept: 'application/json',
                    },
                });
                const data = await response.json();
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [priceFrom, priceTo, brand]);

    const handleFilter = () => {
        const from = document.getElementById("price-from").value;
        const to = document.getElementById("price-to").value;
        const brand = document.getElementById("laptop-brand").value;
        const url = new URL(window.location.href);
        url.searchParams.set('price_from', from);
        url.searchParams.set('price_to', to);
        url.searchParams.set('brand', brand);
        window.location.href = url.toString();
        console.log(url.toString());
    };
    const addToCart = (productId) => {
        fetch('http://127.0.0.1:8000/api/products/check/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: productId,
            quantity: 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            toast.success(data.message);
            const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
            if (data.detail && data.detail.id) {
              if (existingCart[data.detail.id]) {
                existingCart[data.detail.id].order += 1;
              } else {
                existingCart[data.detail.id] = data.detail;
                existingCart[data.detail.id].order = 1;
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
        <>
            <div className="container mt-3">
                <Breadcrumb>
                    <Breadcrumb.Item href="/" className="text-decoration-none">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Laptops</Breadcrumb.Item>
                </Breadcrumb>
                <div className="row gap-5">
                    <div className="col-sm-12 col-md-3 w-20">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Filter</h5>
                                <div className="form-group my-3">
                                    <label htmlFor="price-range">Price Range:</label>
                                    <div className="input-group mt-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Rs</span>
                                        </div>
                                        <input type="number" name="from" className="form-control" id="price-from" placeholder="From" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">-</span>
                                        </div>
                                        <input type="number" name="to" className="form-control" id="price-to" placeholder="To" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="laptop-brand">Laptop Brand:</label>
                                    <select className="form-control my-2" name="brand" id="laptop-brand">
                                        <option value="">Select Brand</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btn-danger w-100" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 d-flex justify-content-sm-start justify-content-center flex-wrap overflow-x-hidden">
                        {products.length === 0 && <h3>No products found</h3>}
                        {
                            products.map((product) => (
                                <div className="col-sm-12 col-md-8 col-lg-5" key={product.id}>
                                    <Card className="p-2" style={{ width: '20rem',height:'100%', border: 'none' }}>
                                        <Card.Img
                                            variant="top"
                                            src={`http://127.0.0.1:8000${product.details_image[0]}`}
                                            className="product-img"
                                        />
                                        <Card.Body>
                                            <Link to={`/product/${product.id}`} className='text-decoration-none text-black'><p>{truncateText(product.name, 100)}</p></Link>
                                            <p className="text-danger">Rs.{product.price}</p>
                                            <button className="btn btn-danger w-100 items-end" onClick={() => addToCart(product.id)}>
                                                Add To Cart
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>

    )
}

export default Laptops;