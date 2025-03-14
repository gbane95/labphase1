import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Categories />
      <FeaturedProducts />

    <Footer/>
    </>
  )
}
