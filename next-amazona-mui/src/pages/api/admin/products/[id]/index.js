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
export default handler;
