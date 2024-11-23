import React, { useEffect, useState } from "react";
import { baseUrl } from "../../assets/constants";
import { Box, Container, List, ListItem, ListItemButton, ListItemText, Typography, Slider } from "@mui/material";
import Card from "./Card";
import axios from "axios";

export default function ProductListing() {  
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([1, 20000]); 

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/product/get/all`);
            setProducts(data.products);

            const uniqueCategories = [
                "All",
                ...new Set(data.products.map((product) => product.category)),
            ];

            const uniqueBrands = [
                "All",
                ...new Set(data.products.map((product) => product.brand)),
            ];

            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchesBrand =
            selectedBrand === "All" || product.brand === selectedBrand;
        const matchesPrice =
            product.sell_price >= priceRange[0] && product.sell_price <= priceRange[1];

        return matchesCategory && matchesBrand && matchesPrice;
    });

    return (
        <Box>
            <Container className="my-5" sx={{ padding: 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                    }}
                >
                    <Box sx={{ minWidth: "200px", borderRight: "1px solid #ddd", padding: 2 }}>
                        {/* Category Filter */}
                        <Typography variant="h6" marginBottom={2}>
                            Categories
                        </Typography>
                        <List>
                            {categories.map((category) => (
                                <ListItem key={category} disablePadding>
                                    <ListItemButton
                                        selected={category === selectedCategory}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        <ListItemText primary={category} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                        {/* Brand Filter */}
                        <Typography variant="h6" marginBottom={2}>
                            Brands
                        </Typography>
                        <List>
                            {brands.map((brand) => (
                                <ListItem key={brand} disablePadding>
                                    <ListItemButton
                                        selected={brand === selectedBrand}
                                        onClick={() => setSelectedBrand(brand)}
                                    >
                                        <ListItemText primary={brand} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                        {/* Price Slider Filter*/}
                        <Typography variant="h6" marginBottom={2}>
                            Price Range
                        </Typography>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={1}
                            max={20000}
                            sx={{ marginBottom: 2 }}
                        />
                        <Typography variant="body2">
                            ₱{priceRange[0]} - ₱{priceRange[1]}
                        </Typography>
                    </Box>

                    {/* Product Display */}
                    <Box
                        sx={{
                            marginLeft: "100px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            flexGrow: 1,
                            justifyContent: "flex-start"
                        }}
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Card key={product._id} product={product} />
                            ))
                        ) : (
                            <Typography>No products match your criteria.</Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
