import React, { useEffect, useState } from "react";
import {
    MDBContainer,
} from "mdb-react-ui-kit";


import axios from "axios";
import { baseUrl } from "../../assets/constants";
import Card from "./Card";
import { Box } from "@mui/material";

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

    useEffect(() => {
        getProducts();
    }, [])

    


    return (
        <MDBContainer className="my-5">
            <div className='d-flex gap-4 flex-wrap justify-content-center'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                    }}
                >
                    {products.map(product => (

                        <Card key={product._id} product={product} />

                    ))}
                </Box>

            </div>

        </MDBContainer>

    )
}