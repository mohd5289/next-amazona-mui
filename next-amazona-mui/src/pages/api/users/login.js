import db from '@/utils/db';
import nextConnect from 'next-connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/auth';

const handler = nextConnect();
handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  db.disconnect();
  console.log(user);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    console.log(token);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});
export default handler;
