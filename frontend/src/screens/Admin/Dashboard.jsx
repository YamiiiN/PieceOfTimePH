// src/pages/Admin/Dboard.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ToolbarActions } from '@toolpad/core/DashboardLayout';

const sampleSalesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4000 },
];

const Dboard = () => {
    return (

        <Box display="flex" marginTop={1}>
            {/* <Sidebar /> */}

            <Box sx={{ flexGrow: 1 }}> {/* Offset to match sidebar width */}
                {/* Topbar with Dynamic Title */}
                {/* <Topbar title={'Dashboard'} /> */}

                {/* Main Content */}
                <Box component="main" sx={{ p: 3, mt: 8 }}>
                    {/* Overview Cards */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Total Sales</Typography>
                                    <Typography variant="h4">$24,000</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Total Orders</Typography>
                                    <Typography variant="h4">1,230</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Returning Customers</Typography>
                                    <Typography variant="h4">620</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Revenue</Typography>
                                    <Typography variant="h4">$72,000</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Sales Chart */}
                    <Box mt={5}>
                        <Typography variant="h5" gutterBottom>
                            Monthly Sales
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={sampleSalesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Recent Orders Table */}
                    <Box mt={5}>
                        <Typography variant="h5" gutterBottom>
                            Recent Orders
                        </Typography>
                        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, color: 'black' }}>
                            <Typography>Order #12345 - $500 - Completed</Typography>
                            <Typography>Order #12346 - $230 - Pending</Typography>
                            <Typography>Order #12347 - $750 - Shipped</Typography>
                            {/* Add more rows or use a Material Table component for real data */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dboard;
