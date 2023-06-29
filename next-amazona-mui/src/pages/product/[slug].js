import data from "@/utils/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link as MUILink,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";
import Product from "@/models/Product";
import db from "@/utils/db";
import axios from "axios";

import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import useStyles from "@/utils/styles";
import { enqueueSnackbar } from "notistack";
import { getError } from "@/utils/error";

export default function ProductScreen(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userInfo } = state;
  //   if (!product) {
  //     return <div>Product not Found</div>;
  //   }
  console.log(product);
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      console.log(data);
      setReviews(data);
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: error });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();

      // alert('success login');
    } catch (err) {
      console.log(err);
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <div>
      {!product ? (
        <div>Product not Found</div>
      ) : (
        <Layout title={product.name} description={product.description}>
          <div className={classes.section}>
            <Link href="/" passHref>
              <MUILink>
                <Typography>back to products</Typography>
              </MUILink>
            </Link>
          </div>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category: {product.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Brand: {product.brand}</Typography>
                </ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly></Rating>
                  <MUILink href="#reviews">
                    {" "}
                    <Typography>({product.numReviews} reviews)</Typography>
                  </MUILink>
                </ListItem>
                <ListItem>
                  <Typography> Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>${product.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0
                            ? "In stock"
                            : "Unavailable"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          <List>
            <ListItem>
              <Typography name="reviews" id="reviews" variant="h2">
                Customer Reviews
              </Typography>
            </ListItem>
            {reviews.length === 0 && <ListItem>No review</ListItem>}
            {reviews.map((review) => (
              <ListItem key={review._id}>
                <Grid container>
                  <Grid item className={classes.reviewItem}>
                    <Typography>
                      <strong>{review.name}</strong>
                    </Typography>
                    <Typography>{review.createdAt.substring(0, 10)}</Typography>
                  </Grid>
                  <Grid item>
                    <Rating value={review.rating} readOnly></Rating>
                    <Typography>{review.comment}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <ListItem>
              {userInfo ? (
                <form onSubmit={submitHandler} className={classes.reviewForm}>
                  <List>
                    <ListItem>
                      <Typography variant="h2">Leave your review</Typography>
                    </ListItem>
                    <ListItem>
                      <TextField
                        multiline
                        variant="outlined"
                        fullWidth
                        name="review"
                        label="Enter Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></TextField>
                    </ListItem>
                    <ListItem>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                      {loading && <CircularProgress></CircularProgress>}
                    </ListItem>
                  </List>
                </form>
              ) : (
                <Typography variant="h2">
                  Please{" "}
                  <Link href={`/login?redirect=/product/${product.slug}`}>
                    Login
                  </Link>{" "}
                  to write a review
                </Typography>
              )}
            </ListItem>
          </List>
        </Layout>
      )}
    </div>
  );
}
{
  /* <Layout title={product.name}>
<div className={classes.section}>
  <Link href="/" passHref>
    <MUILink>back to products</MUILink>
  </Link>
</div>
</Layout> */
}
{
  /* <Layout>
      <div>back to products</div>
    </Layout> */
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();

  return {
    props: { product: db.convertDocToObject(product) },
  };
}
