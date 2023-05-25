import db from '@/utils/db';
import nextConnect from 'next-connect';
import Product from '@/models/Product';
import data from '@/utils/data';
import User from '@/models/User';

const handler = nextConnect();
handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  db.disconnect();
  res.send('seeded successfully');
});
export default handler;
