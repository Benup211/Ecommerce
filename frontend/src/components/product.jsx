import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles_product.css';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/?limit=10&desc=false')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

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
    <div className="container">
      <h5 className="text-center text-uppercase">New Products</h5>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper product"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="p-2" style={{ width: '20rem', border: 'none' }}>
              <Card.Img
                variant="top"
                src={`http://127.0.0.1:8000${product.details_image[0]}`}
                className="product-img"
              />
              <Card.Body>
                <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                  <p>{truncateText(product.name, 100)}</p>
                </Link>
                <p className="text-danger text-start">Rs.{product.price}</p>
                <Button className="btn btn-danger w-100" onClick={() => addToCart(product.id)}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <ToastContainer />
    </div>
  );
};

export default Products;
