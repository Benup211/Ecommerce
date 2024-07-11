import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [transactionUUID, setTransactionUUID] = useState(uuidv4());
  const shippingCost = 500;
  const taxRate = 0.13;

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    console.log(storedCart);
  }, []);

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].order -= 1;
    if (updatedCartItems[itemId].order < 1) {
      updatedCartItems[itemId].order = 1;
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[itemId].order += 1;
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    let total = 0;
    Object.keys(cartItems).forEach(itemId => {
      total += cartItems[itemId].price * cartItems[itemId].order;
    });
    setSubtotal(total);
  }, [cartItems]);

  const total = subtotal + shippingCost;
  const taxAmount = subtotal * taxRate;
  const totalAmount = total + taxAmount;

  const handleDeleteItem = (itemId) => {
    const updatedCartItems = { ...cartItems };
    delete updatedCartItems[itemId];
    toast.success('Item removed from cart');
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleDeleteAllItems = () => {
    setCartItems({});
    localStorage.removeItem('cart');
    const redirectUrl = `https://uat.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${total}&transaction_uuid=123`;
    window.location.href = redirectUrl;
  };
  const t=100;
  const message = `total_amount=${subtotal},transaction_uuid=${transactionUUID},product_code=EPAYTEST`;
  console.log(message)
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return (
    <section className="h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{Object.keys(cartItems).length} items</h6>
                      </div>
                      <hr className="my-4" />

                      {Object.keys(cartItems).map(itemId => (
                        <div key={itemId} className="row mb-4 d-flex justify-content-between align-items-center">
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <a href={`/product/${cartItems[itemId].id}`} className="text-black mb-0">{cartItems[itemId].name}</a>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              className="btn btn-danger px-2"
                              onClick={() => decreaseQuantity(itemId)}
                            >-</button>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={cartItems[itemId].order}
                              readOnly
                            />
                            <button
                              className="btn btn-danger px-2"
                              onClick={() => increaseQuantity(itemId)}
                            >+</button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">Rs {cartItems[itemId].price * cartItems[itemId].order}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button
                              className="btn text-muted"
                              onClick={() => handleDeleteItem(itemId)}
                            >
                              <FontAwesomeIcon icon={faTrash} className="me-2" style={{ color: "#f93434", }} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0"><a href="/list" className="text-body"><i className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">Items</h5>
                        <h5>Rs {subtotal.toFixed(2)}</h5>
                      </div>
                      <h5 className="text-uppercase mb-3">Shipping</h5>
                      <div className="mb-4 pb-2">
                        <h5>Standard-Delivery- Rs{shippingCost.toFixed(2)}</h5>
                      </div>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>Rs {total.toFixed(2)}</h5>
                      </div>
                      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                        <input type="hidden" id="amount" name="amount" value={`${subtotal}`} required />
                        <input type="hidden" id="tax_amount" name="tax_amount" defaultValue="0" required />
                        <input type="hidden" id="total_amount" name="total_amount" value={`${subtotal}`} required />
                        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={`${transactionUUID}`} required />
                        <input type="hidden" id="product_code" name="product_code" defaultValue="EPAYTEST" required />
                        <input type="hidden" id="product_service_charge" name="product_service_charge" defaultValue="0" required />
                        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" defaultValue="0" required />
                        <input type="hidden" id="success_url" name="success_url" defaultValue="http://localhost:5173/order" required />
                        <input type="hidden" id="failure_url" name="failure_url" defaultValue="https://google.com" required />
                        <input type="hidden" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required />
                        <input type="hidden" id="signature" name="signature" value={`${hashInBase64}`} required />
                        <button
                          type="submit"
                          style={{
                            display: 'block !important',
                            backgroundColor: '#60bb46',
                            cursor: 'pointer',
                            color: '#fff',
                            border: 'none',
                            padding: '5px 10px',
                          }}
                        >
                          Esewa Payment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default ShoppingCart;
