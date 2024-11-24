// // import React from 'react'
// // import NavBar from '../../components/Home/NavBar'

// // export default function OrderOfUser() {
// //     return (
// //         <NavBar>
// //             <div>OrderOfUser</div>
// //         </NavBar>

// //     )
// // }

// import React, { useEffect, useState } from 'react';
// import NavBar from '../../components/Home/NavBar';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import MUIDataTables from 'mui-datatables';
// import { TableCell, TableRow } from '@mui/material';
// import { baseUrl } from '../../assets/constants';

// export default function OrderOfUser() {
//     const [orders, setOrders] = useState([]);
//     const { access_token } = useSelector((state) => state.auth);

//     // Fetch user's orders
//     const getUserOrders = async () => {
//         try {
//             const { data } = await axios.get(`${baseUrl}/order/orderOfUser`, {
//                 headers: {
//                     Authorization: `Bearer ${access_token}`,
//                 },
//             });
//             setOrders(data.orders);
//         } catch (error) {
//             console.error('Error fetching user orders:', error);
//         }
//     };

//     useEffect(() => {
//         getUserOrders();
//     }, []);



//     const tableData = orders.map((order) => {
//         return {
//             id: order._id,
//             ordered_date: order.createdAt,
//             status: order.status,
//             items: JSON.stringify(order.order_items),
//         };
//     });

//     const columns = [
//         {
//             label: 'Order ID',
//             name: 'id',
//         },
//         {
//             label: 'Ordered Date',
//             name: 'ordered_date',
//             options: {
//                 customBodyRender: (orderDate) => {
//                     const date = new Date(orderDate);
//                     const options = { month: 'short', day: 'numeric', year: 'numeric' };
//                     return date.toLocaleString('en-US', options);
//                 },
//             },
//         },
//         {
//             label: 'Status',
//             name: 'status',
//         },
//         {
//             label: 'Items',
//             name: 'items',
//             options: {
//                 display: false,
//             },
//         },
//     ];

//     return (
//         <NavBar>
//             <div style={{ padding: '20px' }}>
//                 <MUIDataTables
//                     title="My Orders"
//                     data={tableData}
//                     columns={columns}
//                     options={{
//                         responsive: 'standard',
//                         selectableRows: 'none',
//                         expandableRows: true,
//                         renderExpandableRow: (rowData) => {
//                             const items = JSON.parse(rowData[3]);
//                             return (
//                                 <TableRow>
//                                     <TableCell colSpan={4}>
//                                         {items.map((item) => (
//                                             <div
//                                                 key={item._id}
//                                                 style={{
//                                                     display: 'flex',
//                                                     gap: '10px',
//                                                     marginBottom: '10px',
//                                                     alignItems: 'center',
//                                                 }}
//                                             >
//                                                 <img
//                                                     src={item.product.images[0].url}
//                                                     alt={item.product.name}
//                                                     width={60}
//                                                     height={60}
//                                                 />
//                                                 <div>
//                                                     <div>
//                                                         <strong>Product:</strong> {item.product.name}
//                                                     </div>
//                                                     <div>
//                                                         <strong>Quantity:</strong> {item.quantity}
//                                                     </div>
//                                                     <div>
//                                                         <strong>Total Price:</strong> P
//                                                         {item.quantity * item.product.sell_price}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </TableCell>
//                                 </TableRow>
//                             );
//                         },
//                     }}
//                 />
//             </div>
//         </NavBar>
//     );
// }
