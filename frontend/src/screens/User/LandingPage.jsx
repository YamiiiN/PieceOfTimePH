import React from 'react'
import Hero from '../../components/Home/Hero';
import Footer from '../../components/User/Footer';
import LandingNav from '../../components/Home/Landing';
import Spinner from '../../components/Spinner';

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
        <Footer />
    </>
  )
}

export default LandingPage