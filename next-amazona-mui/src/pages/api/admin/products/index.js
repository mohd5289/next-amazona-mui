import db from "@/utils/db";
import nextConnect from "next-connect";
import Product from "@/models/Product";
import { isAdmin, isAuth } from "@/utils/auth";
import { onError } from "@/utils/error";

const handler = nextConnect();
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});
handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "sample name",
    slug: "sample-slug-" + Math.random(),
    image: "/images/shirt1.jpg",
    price: 0,
    category: "sample-category",
    brand: "sample-brand",
    countinStock: 0,
    description: "sample-description",
    rating: 0,
    numReview: 0,
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product Created", product });
});
export default handler;
