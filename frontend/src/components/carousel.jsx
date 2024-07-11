import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const CarouselImage = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/carousel/', {
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setCarouselItems(data);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    }
  };

  return (
    <Carousel data-bs-theme="dark">
      {carouselItems.map((item) => (
        <Carousel.Item key={item.laptop_id}>
          <div className="container">
            <div className="row py-2">
              <div className="col-sm d-flex justify-content-center align-items-center">
                <Image
                  className="d-block"
                  src={'http://127.0.0.1:8000/media/' + item.image}
                  alt={item.name}
                  fluid
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="col-sm d-flex justify-content-center align-items-center">
                <div>
                  <h1>{item.name}</h1>
                  <p>{item.desc}</p>
                  <a href={`product/${item.laptop_id}`} className="btn btn-danger">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselImage;