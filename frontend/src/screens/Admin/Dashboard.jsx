import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../assets/constants';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import SideBar from './SideBar';
import { ShoppingCart, Group, Inventory } from '@mui/icons-material';

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${baseUrl}/order/orders/monthly-sales`);
      console.log('Fetched Sales Data:', data);
      setSalesData(data); 
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const filteredData = salesData.filter((item) => {
    const itemDate = new Date(`${item.year}-${String(item.month).padStart(2, '0')}-01`);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || itemDate >= start) && (!end || itemDate <= end);
  });

  return (
    <SideBar>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            {/* Total Products */}
            <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 3, mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ fontSize: 40, color: '#388e3c', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                    Total Products
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c', fontFamily: 'Poppins, sans-serif' }}>
                  350
                </Typography>
              </CardContent>
            </Card>

            {/* Total Users */}
            <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 3, mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Group sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                    Total Users
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', fontFamily: 'Poppins, sans-serif' }}>
                  1,200
                </Typography>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingCart sx={{ fontSize: 40, color: '#f57c00', mr: 2 }} />
                  <Typography variant="h6" sx={{ color: '#666', fontFamily: 'Poppins, sans-serif' }}>
                    Total Orders
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00', fontFamily: 'Poppins, sans-serif' }}>
                  540
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Sales Overview */}
          <Grid item xs={12} sm={9}>
            <Box sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                Sales Overview
              </Typography>

              {/* Date Filter Inputs */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  sx={{ width: 200 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  sx={{ width: 200 }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  sx={{
                    backgroundColor: '#f57c00',
                    '&:hover': { backgroundColor: '#ff9800' },
                  }}
                >
                  Reset
                </Button>
              </Box>

              {/* Bar Chart */}
              <Box sx={{ height: 300, width: '100%' }}>
                {isLoading ? (
                  <Typography variant="h6" sx={{ textAlign: 'center', color: '#888' }}>
                    Loading data...
                  </Typography>
                ) : filteredData.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                      <CartesianGrid stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(month) =>
                          new Date(0, month - 1).toLocaleString('default', { month: 'short' })
                        }
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="totalSales" fill="green" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography variant="h6" sx={{ textAlign: 'center', color: '#888' }}>
                    No data available for the selected period.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SideBar>
  );
};

export default Dashboard;
