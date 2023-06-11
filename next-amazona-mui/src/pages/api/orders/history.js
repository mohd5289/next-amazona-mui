import db from '@/utils/db';
import nextConnect from 'next-connect';
// import Product from '@/models/Product';
import { onError } from '@/utils/error';
import Order from '@/models/Order';
import { isAuth } from '@/utils/auth';

const handler = nextConnect({ onError });
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();

const orders = await Order.find({user:req.user._id}) 
// console.log(orders)
res.send(orders)
});
export default handler;
