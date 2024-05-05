import React from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ShoppingCart from "./components/cartdetail";
const CheckoutCart=()=>{
    return(
        <>
        <Navbar/>
        <ShoppingCart/>
        <Footer/>
        </>
    )
}

export default CheckoutCart;