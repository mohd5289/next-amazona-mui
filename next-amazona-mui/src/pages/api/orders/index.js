import db from '@/utils/db';
import nextConnect from 'next-connect';
// import Product from '@/models/Product';
import { onError } from '@/utils/error';
import Order from '@/models/Order';
import { isAuth } from '@/utils/auth';

const handler = nextConnect({ onError });
handler.use(isAuth);
handler.post(async (req, res) => {
  await db.connect();

  const newOrder = new Order({ ...req.body, user: req.user._id });
  const order = await newOrder.save();
  res.status(201).send(order);
});
export default handler;
