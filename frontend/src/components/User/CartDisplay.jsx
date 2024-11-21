import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ArrowBack, Delete, CreditCard, Payments } from "@mui/icons-material";

export default function Basic() {
  return (
    <Box sx={{ backgroundColor: "#FFF", height: "100%" }}>
      <Container sx={{ py: 5, height: "100%" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={7}>
                    <Typography variant="h5" gutterBottom>
                      <IconButton component="a" href="/productlisting">
                        <ArrowBack />
                      </IconButton>
                      Continue shopping
                    </Typography>

                    <hr />

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={4}
                    >
                      <div>
                        <Typography>Shopping cart</Typography>
                        <Typography variant="body2">
                          You have 4 items in your cart
                        </Typography>
                      </div>
                      <Typography>
                        <span style={{ color: "#888" }}>Sort by:</span> price
                      </Typography>
                    </Box>

                    {[1, 2, 3, 4].map((item, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box display="flex" alignItems="center">
                              <CardMedia
                                component="img"
                                src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img${item}.webp`}
                                alt="Shopping item"
                                sx={{ width: 65, borderRadius: 1 }}
                              />
                              <Box ml={2}>
                                <Typography variant="h6">
                                  Product Name {item}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Product Description
                                </Typography>
                              </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Typography sx={{ width: 50 }} align="center">
                                {item}
                              </Typography>
                              <Typography sx={{ width: 80 }} align="center">
                                ${item * 300}
                              </Typography>
                              <IconButton>
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Grid>

                  <Grid item lg={5}>
                    <Card sx={{ backgroundColor: "primary.main", color: "#fff" }}>
                      <CardContent>
                        
                        
                        <Box>
                          <IconButton color="inherit">
                            <CreditCard />
                          </IconButton>
                          <IconButton color="inherit">
                            <Payments />
                          </IconButton>
                        </Box>
                        
                        <hr />
                        <Box display="flex" justifyContent="space-between">
                          <Typography>Subtotal</Typography>
                          <Typography>$4798.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography>Shipping</Typography>
                          <Typography>$20.00</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={2}>
                          <Typography>Total (Incl. taxes)</Typography>
                          <Typography>$4818.00</Typography>
                        </Box>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          size="large"
                        >
                          Checkout - $4818.00
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
