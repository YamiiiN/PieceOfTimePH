import { Box } from '@mui/material'
import React from 'react'
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProfileCard from '../../components/User/ProfileCard'
import NavBar from '../../components/Home/NavBar'
import Footer from '../../components/User/Footer'
import Spinner from '../../components/Spinner';



const Profile = () => {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Spinner />;
    }

  return (
    <Box sx={{background: "linear-gradient(135deg, #f5f5f5, #e3e3e3)"}}>
        <NavBar username={"Diana Carreon"}/>
        <ProfileCard />
        <Footer />
    </Box>
  )
}

export default Profile