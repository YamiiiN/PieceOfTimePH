import React from 'react'
import NavBar from '../../components/Home/NavBar';
import Hero from '../../components/Home/Hero';
import ProductCard from '../../components/Products/Card';
import Footer from '../../components/User/Footer';
import ProductListing from '../../components/Products/ProductListing';
import Spinner from '../../components/Spinner';

const Home = () => {

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
        <NavBar/>
        <Hero />
            <ProductListing />
        <Footer />
    </>
  )
}

export default Home