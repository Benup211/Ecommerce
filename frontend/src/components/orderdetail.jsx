import React, { useEffect, useState } from 'react';

function OrderDetails() {
  const [orderList, setOrderList] = useState([]);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Retrieve id from local storage
        const id = localStorage.getItem('id'); // Adjust this based on how you store the id
        
        const response = await fetch('http://127.0.0.1:8000/api/products/orderDetail/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setOrderList(data.list);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      <h2>Order Details</h2>
      <ul>
        {orderList.map((item, index) => (
          <li key={index}>
            <strong>{item.laptop_name}</strong> - Quantity: {item.quantity}, Status: {item.delivery_status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;
