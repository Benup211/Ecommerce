import { Carousel } from './components/carousel'
import { Categories } from './components/categories'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'
import { NewProducts } from './components/newProducts'
import { SpecialOffer } from './components/specialOffer'

function App() {

  return (
    <div className='w-4/5 mx-auto'>
      <Navbar/>
      <Carousel/>
      <Categories/>
      <SpecialOffer/>
      <NewProducts/>
      <Footer/>
    </div>
  )
}

export default App
