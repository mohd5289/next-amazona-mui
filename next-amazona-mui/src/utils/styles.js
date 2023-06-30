// import { makeStyles } from "@mui/styles";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  
    navbar: {
      backgroundColor: "#203040",
      "& a": {
        color: "#ffffff",
        marginLeft: 10,
      },
    },
    brand: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    main: {
      minHeight: "80vh",
    },
    footer: {
      marginTop: 10,
      textAlign: "center",
    },
    grow: {
      flexGrow: 1,
    },
    section: {
      marginTop: 10,
      marginBottom: 10,
    },
    form: {
      width: "100%",
      maxWidth: 800,
      margin: "0 auto",
    },
    navbarButton: {
      color: "#ffffff",
      textTransform: "initial",
    },
    transparentBackground: {
      backgroundColor: "transparent",
    },
    fullWidth: {
      width: "100%",
    },

    section: { marginTop: 1, marginBottom: 1 },
    error: {
      color: "#f04040",
    },
    reviewItem: {
      marginRight: "1rem",
      borderRight: "1px #808080 solid",
      paddingRight: "1rem",
    },
    reviewForm: {
      maxWidth: 800,
      width: "100%",
    },
    submit: {},
    searchForm: {
      border: "1px solid #ffffff",
      backgroundColor: "#ffffff",
      borderRadius: 5,
    },
    toolbar: {
      justifyContent: "space-between",
    },
    searchSection: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    searchInput: {
      paddingLeft: 5,
      color: "#000000",

      "& ::placeholder": {
        color: "#606060",
      },
    },
    iconButton: {
      backgroundColor: "#f8c040",
      padding: 5,
      borderRadius: "0 5px 5px 0",
      "& span": {
        color: "#000000",
      },
    },
    menuButton: {
      padding: 0,
    },
  },
)); // some CSS that accesses the theme

export default useStyles;
