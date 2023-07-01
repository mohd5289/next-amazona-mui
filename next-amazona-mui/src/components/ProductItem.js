import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function ProductItem({ product, addToCartHandler }) {
  return (
    <Card>
      <Link href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
          </CardContent>
          <Rating value={product.rating} readOnly></Rating>
        </CardActionArea>
      </Link>
      <CardActions>
        <Typography>{product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductItem;
