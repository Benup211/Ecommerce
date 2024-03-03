import { Carousel } from './components/carousel'
import { Categories } from './components/categories'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'
import { NewProducts } from './components/newProducts'
import { SpecialOffer } from './components/specialOffer'

function App() {

  return (
    <>
        <Navbar />
      <div className='w-11/12 md:w-4/5 mx-auto'>
        <Carousel />
        <Categories />
        <SpecialOffer />
        <NewProducts />
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
