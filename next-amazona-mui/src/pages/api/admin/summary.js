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
  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);
  await db.disconnect();
  res.send({ ordersCount, productsCount, usersCount, ordersPrice, salesData });
});

export default handler;
