import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
const SearchLaptops = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
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
        const searchQuery = searchParams.get('s');
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/query/?s=${searchQuery}`, {
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
    }, [searchParams]);

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
                    <div className="col-12 d-flex justify-content-sm-start justify-content-center flex-wrap overflow-x-hidden">
                        {products.length === 0 && <div className="min-vh-100">
                            <h3>No products found for {searchParams.get('s')}</h3></div>}
                        {
                            products.map((product) => (
                                <div className="col-sm-12 col-md-8 col-lg-4" key={product.id}>
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

export default SearchLaptops;