import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { get } from "../../utils/httpClient";
// import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function HomePage() {
  const [searchQuery, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  // const loadProducts = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:3000/products");
  //     setProducts(data);
  //     setFilteredProducts(data);
  //   } catch (error) {
  //    console.log(error);
  //   }
  // };

  const loadProducts = async () => {
    try {
      const { data } = await get("/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/loginPage">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Link>
            <Search>
              <Button onClick={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Button>
              <StyledInputBase
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        {filteredProducts?.map((t) => (
          <CardActionArea key={t.id} sx={{ margin: "2px", padding: "2px" }}>
            <CardContent sx={{ backgroundColor: "red" }}>
              <Typography variant="body2" color="text.secondary">
                {t.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.amount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.storage}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
      </Card>
      <Link to="/productPage">productPage</Link>
    </div>
  );
}
