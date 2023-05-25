import db from '@/utils/db';
import nextConnect from 'next-connect';
import Product from '@/models/Product';

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  db.disconnect();
  res.send(products);
});
export default handler;
