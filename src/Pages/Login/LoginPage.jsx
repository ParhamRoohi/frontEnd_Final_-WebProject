import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import { post } from "../../utils/httpClient";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InputAdornments() {
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />;

  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  // const handleCloseAlert = () => {
  //   setOpenAlert(false);
  // };

  const handleOpenAddDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenDialog(false);
  };

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth && userAuth.id) {
      navigate("/");
    }
  }, []);

  // const handleSend = async () => {
  //   try {
  //     const data = await post("/LoginPage",{username, password});
  //     JSON.stringify(data);
  //     console.log(data);
  //     if (!data.error) {
  //       console.log(error);
  //       console.log("Login", data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     console.log("wrong pass");
  //   }
  // };

  // const handleSend = async () => {
  //   try {
  //     const { data } = await post("/LoginPage", { username, password });
  //     console.log(data);
  //     if (!data.error) { // Check for the correct property
  //       console.log("Login", data);
  //       // Handle successful login here
  //     } else {
  //       console.log("Login failed:", data.message);
  //       // Handle login failure here
  //     }
  //   } catch (error) {
  //     console.log("Error during login:", error);
  //   }
  // };

  const handleSend = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/users", {
        username,
        password,
      });
      if (data.error) {
        console.log("Login failed:", data.message);
      } else {
        localStorage.setItem("userAuth", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };
  const handleSignUp = async () => {
    try {
      const { username, password } = newUserData;
      const { data } = await axios.post("http://localhost:3000/users", {
        username,
        password,
      });
      handleCloseAddDialog();
      if (data.error) {
        console.log("Sign Up failed:");
      }
    } catch (error) {
      console.log("This account exiest", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
        width: "26ch",
      }}
    >
      <div>
        <TextField
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Userame"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" onClick={handleSend}>
          Login
        </Button>
        <div>
          Do you have account?<Link onClick={handleOpenAddDialog}>Sign Up</Link>
        </div>

        <Dialog
          open={openDialog}
          onClose={handleCloseAddDialog}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontFamily: "bold" }}>
            SIGN UP
          </DialogTitle>
          <br />
          <DialogContent>
            <TextField
              label="Username"
              name="username"
              value={newUserData.username}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={newUserData.password}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleCloseAddDialog}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSignUp}>
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
