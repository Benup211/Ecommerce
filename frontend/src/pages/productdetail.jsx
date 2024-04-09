import { Description } from "../components/description";
import { Ladder } from "../components/ladder";
import { Navbar } from "../components/navbar";
import { SimilarProducts  } from "../components/similarProduct";
import { similarProps } from "../props/simlarProps";
import { Footer } from "../components/footer";

const ProductDetail = () => {
    return (
        <>
            <Navbar />
            <Ladder />
            <div className='w-11/12 md:w-4/5 mx-auto'>
                <Description />
                <SimilarProducts productsData={similarProps}/>
            </div>
            <Footer/>
        </>
    );
}
export default ProductDetail;