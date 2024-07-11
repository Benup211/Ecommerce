import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router v6
import { ToastContainer, toast } from 'react-toastify';
const PlaceOrderComponent = () => {
  const navigate = useNavigate();
  const isMountedRef = useRef(false); // Ref to track if component is mounted

  // Function to retrieve user ID from local storage
  const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('id');
  };

  // Function to retrieve cart from local storage
  const getCartFromLocalStorage = () => {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      return JSON.parse(cartString);
    }
    return {};
  };

  // Function to place orders for items in the cart
  const placeOrdersForCartItems = async () => {
    const apiUrl = 'http://127.0.0.1:8000/api/products/order/';
    const userId = getUserIdFromLocalStorage();
    const cart = getCartFromLocalStorage();

    // Array to collect all promises for concurrent requests
    const requestPromises = [];

    // Loop through each item in the cart
    for (const itemId in cart) {
      const item = cart[itemId];
      
      // Prepare the request body for each item
      const requestBody = {
        userId: userId,
        productId: item.id,
        order: item.order
      };

      // Make the POST request and add the promise to the array
      const requestPromise = fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Order placed successfully:', responseData);
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });

      requestPromises.push(requestPromise);
    }

    // Wait for all requests to complete
    try {
      await Promise.all(requestPromises);
      console.log('All orders placed successfully');
      toast.success('All orders placed successfully');
      // Clear the cart from local storage
      localStorage.removeItem('cart');

      // Navigate to '/' (or any other route) after clearing cart
      navigate('/account');
      
    } catch (error) {
      console.error('Failed to place one or more orders:', error);
      toast.error('Failed to place one or more orders');
      // Handle overall error if needed
    }
  };

  // useEffect to run once when component mounts
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      placeOrdersForCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Placing Orders...</h2>
      <ToastContainer />
    </div>
  );
};

export default PlaceOrderComponent;
