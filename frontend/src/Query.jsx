import Footer from "./components/footer";
import Navbar from "./components/navbar";
import SearchLaptops from "./components/searchLaptop";
import { useState, useEffect } from 'react';
function QueryList() {
    return (
        <>
            <Navbar />
            <SearchLaptops />
            <Footer />
        </>
    )
}

export default QueryList;
