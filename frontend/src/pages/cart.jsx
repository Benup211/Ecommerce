import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"
import {CartLadder} from "../components/cartLadder"
import CartList from "../components/cartList"
export const Cart=()=>{
    return(
        <>
        <Navbar/>
        <CartLadder/>
        <CartList/>
        <Footer/>
        </>
    )
}