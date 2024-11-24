import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import MUIDataTables from 'mui-datatables'

import { Button, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../assets/constants';
import SideBar from '../../screens/Admin/SideBar';

const Products = () => {
    // USE STATE
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const tableData = products.map(product => (
        {
            _id: product._id,
            image: (
                <div style={{ display: 'flex', gap: 5, width: 110, overflowX: 'scroll', paddingRight: 10, paddingLeft: 10 }}>
                    {product.images.map(image => (
                        <img key={image._id} src={image.url} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                    ))}
                </div>
            ),
            name: product.name,
            description: product.description,
            category: product.category,
            movement: product.movement,
            brand: product.brand,
            cost_price: product.cost_price,
            sell_price: product.sell_price,
            stock_quantity: product.stock_quantity,
            action: (
                <div>
                    <Button onClick={() => navigate(`/product/update/${product._id}`)} color='success' size='small'>
                        Edit
                    </Button>
                    <Button onClick={() => deleteProduct(product._id)} color='error' size='small'>
                        Delete
                    </Button>
                </div>
            ),
        }
    ))

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure do you want to delete this product?')) {
            await axios.delete(`${baseUrl}/product/delete/${id}`);
            getProducts();
        }
    }

    const columns = [
        {
            label: 'Image',
            name: 'image',
            options: {
                display: false,
                filter: false,
            }

        },
        {
            label: 'Name',
            name: 'name',
            options: {
                filter: true,
                sort: true,
                display: false,
            }
        },
        {
            label: 'Description',
            name: 'description',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Category',
            name: 'category',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Movement',
            name: 'movement',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Brand',
            name: 'brand',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Cost Price',
            name: 'cost_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Sell Price',
            name: 'sell_price',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Stock Quantity',
            name: 'stock_quantity',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: 'Action',
            name: 'action',
            options: {
                filter: false,
            }
        }
    ]

    useEffect(() => {

        getProducts();

    }, [])

    const getProducts = async () => {

        const { data } = await axios.get(`${baseUrl}/product/get/all`);

        setProducts(data.products);
        // console.log(data)

    }

    // BULK DELETE
    const bulkDelete = async (ids) => {
        try {


            const { data } = await axios.put(`${baseUrl}/product/bulk/delete`, {
                productIds: ids,
            })

            getProducts();

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <SideBar>
            <MUIDataTables
                title={"Products List"}
                data={tableData}
                columns={columns}
                options={{

                    expandableRows: true,
                    responsive: 'standard',
                    filterType: 'multiselect',

                    onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
                        // console.log(currentRowsSelected);
                    },

                    // PARA SA BULK DELETE
                    onRowsDelete: ({ data }) => {
                        const ids = data.map(d => (
                            tableData[d.index]._id
                        ))

                        // console.log(ids)
                        bulkDelete(ids);
                    },

                    // Expandable
                    renderExpandableRow: (rowData, rowMeta) => {
                        const colSpan = rowData.length + 1;
                        return (

                            <TableRow>
                                <TableCell colSpan={colSpan}>
                                    {rowData[0]}
                                </TableCell>
                            </TableRow>

                        )
                    },


                }}

            />
        </SideBar>

    )
}

export default Products