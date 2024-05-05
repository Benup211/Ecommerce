import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Laptops from "./components/laptops";
import { useState, useEffect } from 'react';
function ProductList() {
    return (
        <>
            <Navbar />
            <Laptops />
            <Footer />
        </>
    )
}

export default ProductList;
