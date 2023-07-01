import db from "@/utils/db";
import nextConnect from "next-connect";
import Product from "@/models/Product";
import { isAdmin, isAuth } from "@/utils/auth";
import { onError } from "@/utils/error";

const handler = nextConnect({ onError });
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.featuredImage = req.body.featuredImage;
    product.isFeatured = req.body.isFeatured;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.send({ message: "Product Updated Sucessfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }

  //   await db.disconnect();
});
handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);

  if (product) {
    await product.deleteOne();
    await db.disconnect();
    res.send({ message: "Product Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
