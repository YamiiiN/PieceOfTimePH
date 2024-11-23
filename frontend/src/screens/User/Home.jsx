import React from 'react'
import NavBar from '../../components/Home/NavBar';
import Hero from '../../components/Home/Hero';
import ProductCard from '../../components/Products/Card';
import Footer from '../../components/User/Footer';
import ProductListing from '../../components/Products/ProductListing';

const Home = () => {
  return (
    <>
        <NavBar username="Diana Carreon"/>
        <Hero />
            <ProductListing />
        <Footer />
    </>
  )
}

export default Home