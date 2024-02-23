import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { get } from "../../utils/httpClient";
// import { put } from "../../utils/httpClient";
// import { post } from "../../utils/httpClient";
import axios from "axios";
//--------------
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
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
import Stack from "@mui/material/Stack";
// import DialogContentText from "@mui/material/DialogContentText";
// import Badge from "@mui/material/Badge";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";

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
  const handleCloseModal = () => setOpenModal(false);
  const [selectedProductId, setSelectedProductId] = React.useState([]);
  const [editedAmount, setEditedAmount] = React.useState("");
  const [editedPrice, setEditedPrice] = React.useState("");
  const handleOpenModal = (description, price, productId) => {
    setSelectedProductId(productId);
    setSelectedProductDescription(description);
    setSelectedProductPrice(price);
    setOpenModal(true);
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
  
  //_______________________________

  //Export some function from httpClient
  // const handleAddProduct = async () => {
  //   try {
  //     await post("/products", newProductData);
  //     setNewProductData({
  //       brand: "",
  //       name: "",
  //       description: "",
  //       amount: "",
  //       storage: "",
  //       price: "",
  //     });
  //     loadProducts();
  //     handleCloseAddDialog();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //---

  // const loadProducts = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:3000/products");
  //     setProducts(data);
  //     setFilteredProducts(data);
  //   } catch (error) {
  //    console.log(error);
  //   }
  // };

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

  const handleEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/products/${selectedProductId}`,
        {
          amount: editedAmount,
          price: editedPrice,
        }
      );
      handleCloseDialog();
      handleCloseModal();
      loadProducts();
    } catch (error) {
      console.log("Error editing product:", error);
    }
  };
  const handelDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/products/${selectedProductId}`
      );
      handleCloseDialog();
      handleCloseModal();
      loadProducts();
    } catch (error) {
      console.log("Error delete product:", error);
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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
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
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        {filteredProducts?.map((t) => (
          <CardActionArea key={t.id} sx={{ margin: "2px", padding: "2px" }}>
            <CardMedia
              component="img"
              height="180"
              image={t.product_image}
              alt="phone image"
            ></CardMedia>
            <CardContent sx={{ backgroundColor: "red" }}>
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
                onClick={() => handleOpenModal(t.description, t.price, t.id)}
              >
                show Details
              </div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: { timeout: 500 },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="body1"
                      component="p"
                    >
                      Product ID : {selectedProductId}
                      <br />
                      Description : {description}
                      <br />
                      Price : {price}
                    </Typography>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    {isAdmin && (
                      <Button onClick={handleOpenDialog}>Edit</Button>
                    )}
                    {isAdmin && <Button onClick={handelDelete}>delete</Button>}
                    {/* <Link to = "/salePage"><Button onClick={selectedProductId}>Buy</Button></Link> */}
                    <Button
                      onClick={() => {
                        navigate(`/productPage/${selectedProductId}`);
                      }}
                    >
                      Buy
                    </Button>
                    <Dialog
                      open={openDialog}
                      onClose={handleCloseDialog}
                      PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const formJson = Object.fromEntries(
                            formData.entries()
                          );
                          const email = formJson.email;
                          console.log(email);
                          handleCloseDialog();
                        },
                      }}
                    >
                      <DialogTitle>Edit Products</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="amount"
                          name="amount"
                          label="amount"
                          type="text"
                          fullWidth
                          variant="standard"
                          onChange={handleAmountChange}
                        />
                        <TextField
                          autoFocus
                          required
                          margin="dense"
                          id="price"
                          name="price"
                          label="price"
                          type="text"
                          fullWidth
                          variant="standard"
                          onChange={handlePriceChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleEdit}>Submit</Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Fade>
              </Modal>
            </CardContent>
          </CardActionArea>
        ))}
      </Card>
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
