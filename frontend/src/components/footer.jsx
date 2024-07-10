import React,{useState,useEffect} from 'react';

const Footer = () => {
  const [categories, setCategories] = useState([]);

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
  return (
    <div className="mt-5">
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#1c2331' }}>
        <div className="container">
          <section className="d-flex justify-content-between p-4" style={{ backgroundColor: '#FFC11' }}>
            <div className="me-5">
              <h6>Elextra Ecommerce</h6>
            </div>
          </section>
          <section>
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Elextra</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    Shop for the best Laptops in the market
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  {categories.map((category) => (
                    <p key={category.name}>
                      <a href="#!" className="text-white">{category.name}</a>
                    </p>
                  ))}
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p>
                    <a href="#!" className="text-white">Your Account</a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                  <p><i className="fas fa-home mr-3"></i> Kusunti-14,Nepal</p>
                  <p><i className="fas fa-envelope mr-3"></i> benup211@gmail.com</p>
                  <p><i className="fas fa-phone mr-3"></i> + 977 9860000000</p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-3">
            <hr />
            <p>At Elextra, we understand that finding the perfect laptop can be a daunting task, especially considering the limited availability and high prices in the market. That's why we have made it our mission to offer a comprehensive range of laptops, including regular models, gaming laptops, and thin and light ultrabooks. We believe that everyone deserves to find a laptop that perfectly fits their needs and budget.</p>
            <hr/>
          </div>
        </div>
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2024 elexta.com
          </div>
      </footer>
    </div>
  );
};

export default Footer;