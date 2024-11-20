import React from 'react'
import NavBar from '../../components/Home/NavBar';
import Hero from '../../components/Home/Hero';
import ProductCard from '../../components/Products/Card';
import Footer from '../../components/User/Footer';

const products = [
  {
    id: 1 ,
    name: 'Product 3',
    description: 'You need this product in your life!',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2 ,
    name: 'Product 3',
    description: 'You need this product in your life!',
    price: 39.99,
    image: 'https://via.placeholder.com/150', 
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'You need this product in your life!',
    price: 39.99,
    image: 'https://via.placeholder.com/150', 
  },
  {
    id: 4,
    name: 'Product 3',
    description: 'You need this product in your life!',
    price: 39.99,
    image: 'https://via.placeholder.com/150', 
  },
  {
    id: 5,
    name: 'Product 3',
    description: 'You need this product in your life!',
    price: 39.99,
    image: 'https://via.placeholder.com/150', 
  },
];

const Home = () => {
  return (
    <>
        <NavBar username="Diana Carreon"/>
        <Hero />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ProductCard />
        </div>
        <Footer />
    </>
  )
}

export default Home