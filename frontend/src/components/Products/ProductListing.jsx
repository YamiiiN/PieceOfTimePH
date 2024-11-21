import React, { useEffect, useState } from "react";
import { baseUrl } from "../../assets/constants";
import { Box, Container } from "@mui/material";
import Card from "./Card";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductListing() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/product/get/all`)
            console.log(data);
            setProducts(data.products);
        } catch (error) {
            console.log(error)
        }
    }
    const { id } = useParams();
    const [product, setProduct] = useState(null);
  
    // Fetch product data
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/product/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    useEffect(() => {
        getProducts();
        // getSingleProduct();
    }, [])




    return (
        <Box marginTop={5}>
        <Container className="my-5">
            <div className='d-flex gap-4 flex-wrap justify-content-center'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    {products.map(product => (
                        <Card key={product._id} product={product} />
                    ))}
                </Box>
            </div>
        </Container>
        </Box>
    )
}
