import React, { useEffect, useState } from 'react'
import SideBar from '../../screens/Admin/SideBar';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBTextArea,
    MDBFile,
} from 'mdb-react-ui-kit';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../assets/constants';
import { useSelector } from 'react-redux';

export default function ProductUpdate() {

    // PARA MAKUHA YUNG ID NG NASA LINK OR WEBSITE
    const { id } = useParams();

    const navigate = useNavigate();

    const { access_token } = useSelector(state => state.auth)

    const categoryOptions = [
        "Classic",
        "Dive",
        "Pilot",
        "Field",
        "Dress",
        "Chronograph",
        "Moon Phase",
        "Vintage",
    ];

    const movementOptions = [
        "Mechanical",
        "Automatic",
        "Quartz",
        "Solar",
        "Kinetic",
    ];

    const brandOptions = [
        "Seiko",
        "Citizen",
        "Rolex",
        "Omega",
        "Cartier",
        "Breitling",
        "Tudor",
        "Grand Seiko",
    ];

    // YUP VALIDATION
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),

        description: Yup.string()
            .required('Description is required'),

        category: Yup.string()
            .required('Category is required'),

        movement: Yup.string()
            .required('Movement is required'),

        brand: Yup.string()
            .required('Brand is required'),

        sell_price: Yup.number()
            .required('Sell price is required')
            .positive('Sell price must be a positive number'),

        cost_price: Yup.number()
            .required('Cost price is required')
            .positive('Cost price must be a positive number'),

        stock_quantity: Yup.number()
            .required('Stock quantity is required')
            .integer('Stock quantity must be an integer')
            .min(0, 'Stock quantity cannot be negative'),

        // images: Yup.string()
        //     .required('Images are required'),
    });

    // FORMIK
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            movement: '',
            brand: '',
            sell_price: '',
            cost_price: '',
            stock_quantity: '',
            images: '',
        },
        validationSchema,
        onSubmit: () => {
            saveData();
        },
    });

    // FUNCTION FOR GETTING SINGLE PRODUCT
    const getProduct = async () => {

        // const { data } = await axios.post(`${baseUrl}/product/${id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${access_token}`
        //     },
        // });

        // // const { data } = await axios.get(`${baseUrl}/product/${id}`);

        // formik.setFieldValue('name', data.product.name)
        // formik.setFieldValue('description', data.product.description)
        // formik.setFieldValue('category', data.product.category)
        // formik.setFieldValue('movement', data.product.movement)
        // formik.setFieldValue('brand', data.product.brand)
        // formik.setFieldValue('sell_price', data.product.sell_price)
        // formik.setFieldValue('cost_price', data.product.cost_price)
        // formik.setFieldValue('stock_quantity', data.product.stock_quantity)

        try {
            const { data } = await axios.get(`${baseUrl}/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            });

            formik.setFieldValue('name', data.product.name);
            formik.setFieldValue('description', data.product.description);
            formik.setFieldValue('category', data.product.category);
            formik.setFieldValue('movement', data.product.movement);
            formik.setFieldValue('brand', data.product.brand);
            formik.setFieldValue('sell_price', data.product.sell_price);
            formik.setFieldValue('cost_price', data.product.cost_price);
            formik.setFieldValue('stock_quantity', data.product.stock_quantity);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };




    // FUNCTION FOR UPDATING SINGLE PRODUCT
    const saveData = async () => {
        try {

            const formData = new FormData(); // FormData() is an object that handles file uplaods

            formData.append('name', formik.values.name)
            formData.append('description', formik.values.description)
            formData.append('category', formik.values.category)
            formData.append('movement', formik.values.movement)
            formData.append('brand', formik.values.brand)
            formData.append('sell_price', formik.values.sell_price)
            formData.append('cost_price', formik.values.cost_price)
            formData.append('stock_quantity', formik.values.stock_quantity)

            for (let i = 0; i <= formik.values.images.length; i++) {

                formData.append('images', formik.values.images[i]);

            }

            // const { data } = await axios.put(`${baseUrl}/product/update/${id}`, formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //         "Authorization": `Bearer ${access_token}`
            //     }
            // });
            const { data } = await axios.put(`${baseUrl}/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access_token}`,
                },
            });

            alert(data.message);
            navigate('/admin/products');
            console.log(data.product);

        } catch (error) {

            alert("Error occured!");
            console.error(error);

        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <SideBar>
            <MDBContainer>
                <div>
                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput
                                name="name"
                                id="name"
                                label="Product Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {/* CONDITIONAL RENDERING */}
                            {formik.touched.name && (
                                <small style={{ color: 'red' }}>{formik.errors.name}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBTextArea
                                name="description"
                                id="description"
                                label="Description"
                                rows={4}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && (
                                <small style={{ color: 'red' }}>{formik.errors.description}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <FormControl fullWidth size="small">
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {categoryOptions.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.category && (
                                <small style={{ color: 'red' }}>{formik.errors.category}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <FormControl fullWidth size="small">
                                <InputLabel id="movement">Movement</InputLabel>
                                <Select
                                    labelId="movement"
                                    id="movement"
                                    name="movement"
                                    value={formik.values.movement}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {movementOptions.map((movement) => (
                                        <MenuItem key={movement} value={movement}>
                                            {movement}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.movement && (
                                <small style={{ color: 'red' }}>{formik.errors.movement}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <FormControl fullWidth size="small">
                                <InputLabel id="brand">Brand</InputLabel>
                                <Select
                                    labelId="brand"
                                    id="brand"
                                    name="brand"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {brandOptions.map((brand) => (
                                        <MenuItem key={brand} value={brand}>
                                            {brand}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {formik.touched.brand && (
                                <small style={{ color: 'red' }}>{formik.errors.brand}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput
                                name="sell_price"
                                id="sell_price"
                                type="number"
                                label="Sell Price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.sell_price}
                            />
                            {formik.touched.sell_price && (
                                <small style={{ color: 'red' }}>{formik.errors.sell_price}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput
                                name="cost_price"
                                id="cost_price"
                                type="number"
                                label="Cost Price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cost_price}
                            />
                            {formik.touched.cost_price && (
                                <small style={{ color: 'red' }}>{formik.errors.cost_price}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBInput
                                name="stock_quantity"
                                id="stock_quantity"
                                type="number"
                                label="Stock Quantity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock_quantity}
                            />
                            {formik.touched.stock_quantity && (
                                <small style={{ color: 'red' }}>{formik.errors.stock_quantity}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingBottom: 15 }}>
                        <MDBCol>
                            <MDBFile
                                name="images"
                                id="images"
                                multiple
                                label="Images"
                                onChange={(e) =>
                                    formik.setFieldValue('images', e.target.files)
                                }
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.images && (
                                <small style={{ color: 'red' }}>{formik.errors.images}</small>
                            )}
                        </MDBCol>
                    </MDBRow>

                    <MDBBtn onClick={formik.handleSubmit} className='mb-4' block size='sm'>
                        Save
                    </MDBBtn>
                </div>
            </MDBContainer>
        </SideBar>


    )
}
