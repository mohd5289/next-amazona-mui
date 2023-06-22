import db from "@/utils/db";
import nextConnect from "next-connect";
// import Product from '@/models/Product';
import { onError } from "@/utils/error";
import Order from "@/models/Order";
import { isAdmin, isAuth } from "@/utils/auth";
import Product from "@/models/Product";
import User from "@/models/User";

const handler = nextConnect({ onError });
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate("user", "name");
  await db.disconnect();
  res.send(orders);
});

export default handler;
