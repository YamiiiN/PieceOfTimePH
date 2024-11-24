import React, { useEffect, useState, useCallback } from "react";
import { baseUrl } from "../../assets/constants";
import {
    Box,
    Container,
    Grid,
    Typography,
    Slider,
    Button,
    Card as MuiCard,
    CardContent,
} from "@mui/material";
import Card from "./Card";
import axios from "axios";
import { Star, StarBorder } from "@mui/icons-material";  
import { useSelector } from "react-redux";



export default function ProductListing() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([1, 20000]);
    const [selectedRating, setSelectedRating] = useState(0); 
    const [visibleCount, setVisibleCount] = useState(9);
    const [isLoading, setIsLoading] = useState(false);

    const { access_token } = useSelector(state => state.auth)

    const getProducts = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.get(`${baseUrl}/product/get/all`, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${access_token}`
                },
            });
           
            setProducts(data.products);

            const uniqueCategories = ["All", ...new Set(data.products.map((product) => product.category))];
            const uniqueBrands = ["All", ...new Set(data.products.map((product) => product.brand))];

            setCategories(uniqueCategories);
            setBrands(uniqueBrands);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating); // Static rating filter
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
        const matchesPrice = product.sell_price >= priceRange[0] && product.sell_price <= priceRange[1];
        const matchesRating = selectedRating === 0 || product.rating >= selectedRating; // Static rating check

        return matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const hasMoreProducts = visibleCount < filteredProducts.length;

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (
            scrollHeight - scrollTop <= clientHeight + 100 &&
            !isLoading &&
            hasMoreProducts
        ) {
            setIsLoading(true);

            setTimeout(() => {
                setVisibleCount((prev) => prev + 3);
                setIsLoading(false);
            }, 500);
        }
    }, [isLoading, hasMoreProducts]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <Container sx={{ paddingY: 4}}>
            <Typography>
                Filters
            </Typography>
            <Grid container spacing={4}>
                {/* Filters Section */}
                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        {/* Price Filter */}
                        <MuiCard >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Price Range
                                </Typography>
                                <Slider
                                    size="small"
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={20000}
                                    sx={{
                                        color: "#000000",
                                    }}
                                />
                                <Typography textAlign="center">
                                    ₱{priceRange[0]} - ₱{priceRange[1]}
                                </Typography>
                            </CardContent>
                        </MuiCard>

                        {/* Rating Filter (Stars Only) */}
                        <MuiCard>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Rating (wala pa to, di pa yan gagana)
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <Button
                                            key={rating}
                                            onClick={() => handleRatingChange(rating)}
                                            sx={{
                                                padding: 0,
                                                minWidth: "auto",
                                                borderRadius: "50%",
                                                backgroundColor: selectedRating >= rating ? "#FFD700" : "transparent", // Yellow when selected
                                                "&:hover": {
                                                    backgroundColor: selectedRating >= rating ? "#FFD700" : "rgba(0, 0, 0, 0.1)",
                                                },
                                            }}
                                        >
                                            {selectedRating >= rating ? (
                                                <Star sx={{ color: "#FFD700" }} />
                                            ) : (
                                                <StarBorder sx={{ color: "#FFD700" }} />
                                            )}
                                        </Button>
                                    ))}
                                </Box>
                            </CardContent>
                        </MuiCard>

                        {/* Category Filter */}
                        <MuiCard >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Categories
                                </Typography>
                                <Box>
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={category === selectedCategory ? "contained" : "outlined"}
                                            size="small"
                                            color="primary"
                                            onClick={() => setSelectedCategory(category)}
                                            sx={{
                                                marginBottom: 1,
                                                width: "100%",
                                                justifyContent: "start",
                                                textTransform: "capitalize",
                                                backgroundColor: category === selectedCategory ? "#000" : "transparent",
                                                color: category === selectedCategory ? "#fff" : "#000",
                                                borderColor: category === selectedCategory ? "#000" : "rgba(0, 0, 0, 0.5)",
                                                "&:hover": {
                                                    backgroundColor: category === selectedCategory ? "#333" : "rgba(0, 0, 0, 0.1)",
                                                },
                                            }}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </Box>
                            </CardContent>
                        </MuiCard>

                        {/* Brand Filter */}
                        <MuiCard >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Brands
                                </Typography>
                                <Box>
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant={brand === selectedBrand ? "contained" : "outlined"}
                                            size="small"
                                            color="secondary"
                                            onClick={() => setSelectedBrand(brand)}
                                            sx={{
                                                marginBottom: 1,
                                                width: "100%",
                                                justifyContent: "start",
                                                textTransform: "capitalize",
                                                backgroundColor: brand === selectedBrand ? "#000" : "transparent",
                                                color: brand === selectedBrand ? "#fff" : "#000",
                                                borderColor: brand === selectedBrand ? "#000" : "rgba(0, 0, 0, 0.5)",
                                                "&:hover": {
                                                    backgroundColor: brand === selectedBrand ? "#333" : "rgba(0, 0, 0, 0.1)",
                                                },
                                            }}
                                        >
                                            {brand}
                                        </Button>
                                    ))}
                                </Box>
                            </CardContent>
                        </MuiCard>

                        
                    </Box>
                </Grid>

                {/* Product Listing Section */}
                <Grid item xs={12} md={9}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                        PRODUCT LIST
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 3,
                        }}
                    >
                        {visibleProducts.length > 0 ? (
                            visibleProducts.map((product) => (
                                <Card key={product._id} product={product} />
                            ))
                        ) : (
                            <Typography>No products match your criteria.</Typography>
                        )}
                        {isLoading && (
                            <Typography
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: 2,
                                    color: "#777",
                                }}
                            >
                                Loading more products...
                            </Typography>
                        )}
                        {!hasMoreProducts && !isLoading && (
                            <Typography
                                sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: 2,
                                    color: "#777",
                                }}
                            >
                                No more products to display.
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
