// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import MUIDataTables from 'mui-datatables';
// import { Button, TableCell, TableRow } from '@mui/material';
// import { baseUrl } from '../../assets/constants';


// export default function UserOrderList() {
//     const [orders, setOrders] = useState([]);
//     const { access_token } = useSelector((state) => state.auth);

//     const getUserOrders = async () => {
//         try {
//             const { data } = await axios.get(`${baseUrl}/order/user/orders`, {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                 },
//             });
//             setOrders(data.orders);
//         } catch (error) {
//             console.error('Failed to fetch user orders:', error);
//         }
//     };

//     useEffect(() => {
//         getUserOrders();
//     }, []);

//     const tableData = orders.map((order) => ({
//         ordered_date: order.createdAt,
//         status: order.status,
//         action: order,
//         order: JSON.stringify(order),
//     }));

//     const columns = [
//         {
//             label: 'Ordered Date',
//             name: 'ordered_date',
//             options: {
//                 customBodyRender: (orderDate) => {
//                     const date = new Date(orderDate);
//                     const options = { month: 'short', day: 'numeric', year: 'numeric' };
//                     return date.toLocaleDateString('en-US', options);
//                 },
//             },
//         },
//         {
//             label: 'Status',
//             name: 'status',
//         },
//         {
//             label: 'Item',
//             name: 'action',
//             options: {
//                 customBodyRender: (order) => {
//                     const orderItems = order.order_items;
//                     return (
//                         <div>
//                             {orderItems.map((item, index) => (
//                                 <div key={index} style={{ marginBottom: '10px' }}>
//                                     {/* <img src={item.product.images[0].url} alt={item.product.name} width={60} /> */}
//                                     <div>
//                                         <p>{item.product.name}</p>
//                                         {/* <p>Quantity: {item.quantity}</p>
//                                         <p>Total Price: P{item.quantity * item.product.sell_price}</p> */}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     );
//                 },
//             },
//         },
//     ];

//     return (
//         <div>
//             <h1>Your Orders</h1>
//             <MUIDataTables
//                 title="Your Order History"
//                 data={tableData}
//                 columns={columns}
//                 options={{
//                     responsive: 'standard',
//                     selectableRows: 'none',
//                 }}
//             />
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MUIDataTables from 'mui-datatables';
import { Button } from '@mui/material';
import { baseUrl } from '../../assets/constants';
import { useNavigate } from 'react-router-dom';

export default function UserOrderList() {
    const [orders, setOrders] = useState([]);
    const { access_token } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const getUserOrders = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/order/user/orders`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            // Filter orders based on status
            const filteredOrders = data.orders.filter(order =>
                ['pending', 'confirmed', 'on-delivery'].includes(order.status.toLowerCase())
            );
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Failed to fetch user orders:', error);
        }
    };

    useEffect(() => {
        getUserOrders();
    }, []);

    const tableData = orders.map((order) => ({
        ordered_date: order.createdAt,
        status: order.status,
        product: order,
        order_id: order._id,
    }));

    const columns = [
        {
            label: 'Ordered Date',
            name: 'ordered_date',
            options: {
                customBodyRender: (orderDate) => {
                    const date = new Date(orderDate);
                    const options = { month: 'short', day: 'numeric', year: 'numeric' };
                    return date.toLocaleDateString('en-US', options);
                },
            },
        },
        {
            label: 'Status',
            name: 'status',
        },
        {
            label: 'Item',
            name: 'product',
            options: {
                customBodyRender: (order) => {
                    const orderItems = order.order_items;
                    return (
                        <div>
                            {orderItems.map((item, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <div>
                                        <p>{item.product.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                },
            },
        },
        {
            label: 'Action',
            name: 'order_id',
            options: {
                customBodyRender: (orderId) => (
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/order/details/${orderId}`)}
                    >
                        View Details
                    </Button>
                ),
            },
        },
    ];

    return (
        <div>
            <MUIDataTables
                title="Your Order History"
                data={tableData}
                columns={columns}
                options={{
                    responsive: 'standard',
                    selectableRows: 'none',
                }}
            />
        </div>
    );
}