import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
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
});
export default useStyles;
