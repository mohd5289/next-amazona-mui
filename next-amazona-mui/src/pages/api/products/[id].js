import db from '@/utils/db';
import nextConnect from 'next-connect';
import Product from '@/models/Product';

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  res.send(product);
});
export default handler;
