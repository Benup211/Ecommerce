import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
import { Pagination } from 'swiper/modules';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/categories/', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <div className="container mt-2">
        <h5 className='text-center text-uppercase'>Categories</h5>
        <Swiper
          slidesPerView={10}
          spaceBetween={5}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper category"
        >
          {categories.map(category => (
            <SwiperSlide key={category.name}>
              <img className="category-img" src={`http://127.0.0.1:8000/media/${category.image}`} alt={category.name}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;