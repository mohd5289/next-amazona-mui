import db from "@/utils/db";
import nextConnect from "next-connect";
import Product from "@/models/Product";

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect();
  const categories = await Product.find().distinct("category");
  db.disconnect();
  res.send(categories);
});
export default handler;
