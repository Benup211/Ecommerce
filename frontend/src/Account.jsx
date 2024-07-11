import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import OrderDetails from './components/orderdetail';

function AccountPage() {
    const [accountData, setAccountData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                // Get id from localStorage
                const id = localStorage.getItem('id');
                if (!id) {
                    throw new Error('No id found in localStorage');
                }

                const response = await fetch('http://127.0.0.1:8000/api/products/account/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*' // Adjust as per your API requirements
                    },
                    body: JSON.stringify({ id: parseInt(id) }) // Ensure id is parsed correctly if needed
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch account data');
                }

                const data = await response.json();
                setAccountData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAccountData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="account-page d-flex flex-column justify-content-center align-items-center">
                <div className='mt-4'>
                    <h1>Account Information</h1>
                    {error && <p>Error: {error}</p>}
                    {accountData ? (
                        <div className="account-details">
                            <p><strong>First Name:</strong> {accountData.first_name}</p>
                            <p><strong>Last Name:</strong> {accountData.last_name}</p>
                            <p><strong>Phone Number:</strong> {accountData.phone_number}</p>
                            <p><strong>Address:</strong> {accountData.address}</p>
                            <p><strong>Street:</strong> {accountData.street}</p>
                            <p><strong>House No:</strong> {accountData.house_no}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <hr/>
                </div>
                <OrderDetails />
            </div>
            <Footer />
        </div>
    );
}

export default AccountPage;
