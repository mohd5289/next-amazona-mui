import db from '@/utils/db';
import nextConnect from 'next-connect';
import Order from '@/models/Order';
import { isAuth } from '@/utils/auth';

const handler = nextConnect();
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  db.disconnect();
  res.send(order);
});
export default handler;
