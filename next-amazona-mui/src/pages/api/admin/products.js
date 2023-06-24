import db from "@/utils/db";
import nextConnect from "next-connect";
// import Product from '@/models/Product';
import { onError } from "@/utils/error";
// import Product from "@/models/Product";
import { isAdmin, isAuth } from "@/utils/auth";
import Product from "@/models/Product";
import User from "@/models/User";

const handler = nextConnect({ onError });
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default handler;
