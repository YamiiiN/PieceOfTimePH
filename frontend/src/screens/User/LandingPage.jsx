import React from 'react'
import Hero from '../../components/Home/Hero';
import Footer from '../../components/User/Footer';
import LandingNav from '../../components/Home/Landing';
import Spinner from '../../components/Spinner';
import ProductListing from '../../components/Products/ProductListing';

const LandingPage = () => {

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
      <LandingNav />
      <ProductListing />
      <Footer />
    </>
  )
}

export default LandingPage