import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { get } from "../../utils/httpClient";
import axios from "axios";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CardActionArea } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import RemoveIcon from '@mui/icons-material/Remove';

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [searchQuery, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [description, setSelectedProductDescription] = React.useState("");
  const [price, setSelectedProductPrice] = React.useState("");
  const [open, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const [openPage, setOpenPage] = React.useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [selectedProductId, setSelectedProductId] = React.useState([]);
  const [editedAmount, setEditedAmount] = React.useState("");
  const [editedPrice, setEditedPrice] = React.useState("");

  const hanleOpenPage = (productId) => {
    navigate(`/productPage/${productId}`);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    loadProducts();
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    setIsAdmin(userAuth?.is_admin || false);
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handlePriceChange = (event) => {
    setEditedPrice(event.target.value);
  };

  const handleAmountChange = (event) => {
    setEditedAmount(event.target.value);
  };
  const handleOpenaddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const [newProductData, setNewProductData] = useState({
    brand: "",
    name: "",
    description: "",
    amount: "",
    storage: "",
    price: "",
    product_image: "",
  });

  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/products",
        newProductData
      );
      setNewProductData({
        brand: "",
        name: "",
        description: "",
        amount: "",
        storage: "",
        price: "",
        product_image: "",
      });
      loadProducts(res);
      handleCloseAddDialog();
    } catch (error) {
      console.log(error);
    }
  };
  const loadProducts = async () => {
    try {
      const { data } = await get("/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData({ ...newProductData, [name]: value });
  };

  const [openAddDialog, setOpenAddDialog] = React.useState(false);

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

  const handleSortByPrice = () => {
    let sortedProducts = [...products];
    sortedProducts.sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedProducts);
  };

  const logout = () => {
    localStorage.setItem("userAuth", null);
  };

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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/LoginPage">
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
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <StyledInputBase
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Tooltip title="Sort Product">
              <IconButton onClick={handleSortByPrice}>
                <ArrowDownwardIcon />
              </IconButton>
            </Tooltip>

            {isAdmin && (
              <Tooltip title="Add Product">
                <IconButton onClick={handleOpenaddDialog}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
            <Button onClick={logout} variant="contained">
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <Card sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {filteredProducts?.map((t) => (
            <CardActionArea
              key={t.id}
              sx={{
                display: "flex",
                flexDirection: "colunm",
                margin: "10px",
                padding: "10px",
                height: "20%",
                width: "20%",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={t.product_image}
                alt="phone image"
              ></CardMedia>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {t.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.name}
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
                <div
                  onClick={() => hanleOpenPage(t.id)}
                >
                  Show Details
                </div>
              </CardContent>
            </CardActionArea>
          ))}
        </Card>
      </Box>
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <InputLabel size="normal" focused>
            Brand:
          </InputLabel>
          <TextField
            name="brand"
            value={newProductData.brand}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Name:
          </InputLabel>
          <TextField
            name="name"
            value={newProductData.name}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Description:
          </InputLabel>
          <TextField
            name="description"
            value={newProductData.description}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Amount:
          </InputLabel>
          <TextField
            name="amount"
            value={newProductData.amount}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Storage:
          </InputLabel>
          <TextField
            name="storage"
            value={newProductData.storage}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Price:
          </InputLabel>
          <TextField
            name="price"
            value={newProductData.price}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Photo URL:
          </InputLabel>
          <TextField
            name="photoURL"
            value={newProductData.product_image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
