import Head from "next/head";
import Image from "next/image";
// import { Inter } from 'next/font/google'
import styles from "@/styles/Home.module.css";
import Layout from "../components/Layout";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link as MUILink,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import data from "@/utils/data";
import Link from "next/link";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useRouter } from "next/router";
import useStyles from "@/utils/styles";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import ProductItem from "@/components/ProductItem";
import Carousel from "react-material-ui-carousel";

// const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const router = useRouter();
  //   if (!product) {
  //     return <div>Product not Found</div>;
  //   }
  console.log(product);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout>
      <Carousel className={classes.mt1} animation="slide">
        {props.featuredProducts.map((product) => (
          <Link key={product._id} href={`/product/${product.slug}`} passHref>
            <MUILink>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={classes.featuredImage}
              ></img>
            </MUILink>
          </Link>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {props.topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const topRatedProductsDoc = await Product.find({}, "-reviews")
    .lean()
    .sort({ rating: -1 })
    .limit(6);

  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .sort({ rating: -1 })
    .limit(3);
  await db.disconnect();

  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObject),
      topRatedProducts: topRatedProductsDoc.map(db.convertDocToObject),
    },
  };
}
