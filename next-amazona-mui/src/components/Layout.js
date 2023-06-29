import React, { useContext, useEffect } from "react";
import Head from "next/head";
import {
  AppBar,
  Badge,
  Box,
  Button,
  cardActionAreaClasses,
  createTheme,
  CssBaseline,
  Drawer,
  Icon,
  Menu,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  Divider,
  ListItemText,
} from "@mui/material";
import { Container } from "@mui/system";
import useStyles from "@/utils/styles";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Cancel } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import axios from "axios";
import { getError } from "@/utils/error";
// import Menu from "@mui/icons-material/Menu";

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isOpen, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, {});
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
  };
  const loginMenuCloseProfile = () => {
    setAnchorEl(null);

    router.push("/profile");
  };
  const loginMenuCloseOrderHistory = () => {
    setAnchorEl(null);

    router.push("/order-history");
  };
  const loginMenuCloseDashboard = () => {
    setAnchorEl(null);

    router.push("/admin/dashboard");
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  // const loginMenuClosehandler = (e) => {
  //   setAnchorEl(null);
  // };
  const logoutClickHandler = (e) => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");

    router.push("/");
  };
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSideBarVisible(true);
  };
  const sideBarCloseBarHandler = () => {
    setSideBarVisible(false);
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
              >
                <MenuIcon sx={classes.navbar} />
              </IconButton>
              <Link href="/" passHref>
                <MUILink>
                  <Typography className={classes.brand}>amazona</Typography>
                </MUILink>
              </Link>
            </Box>
            <Drawer
              anchor="left"
              open={sideBarVisible}
              onClose={sideBarCloseBarHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography> Shopping By Category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sideBarCloseBarHandler}
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      components="a"
                      onClick={sideBarCloseBarHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
            <div className={classes.grow}> </div>
            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}>
                {" "}
              </Switch>
              <Link href="/cart" passHref>
                <MUILink>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Typography>
                </MUILink>
              </Link>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    sx={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseProfile}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseOrderHistory}>
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem onClick={loginMenuCloseDashboard}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login" passHref>
                  <MUILink>
                    <Typography component="span">Login</Typography>
                  </MUILink>
                </Link>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All right reserved. Next amazona</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
