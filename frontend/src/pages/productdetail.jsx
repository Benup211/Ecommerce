import { Description } from "../components/description";
import { Ladder } from "../components/ladder";
import { Navbar } from "../components/navbar";
import { NewProducts } from "../components/newProducts";
import { productsData } from '../props/productsProps'
import { Footer } from "../components/footer";

const ProductDetail = () => {
    return (
        <>
            <Navbar />
            <Ladder />
            <div className='w-11/12 md:w-4/5 mx-auto'>
                <Description />
                <NewProducts productsData={productsData}/>
            </div>
            <Footer/>
        </>
    );
}
export default ProductDetail;