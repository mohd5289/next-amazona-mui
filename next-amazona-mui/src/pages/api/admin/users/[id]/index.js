import db from "@/utils/db";
import nextConnect from "next-connect";
import User from "@/models/User";
import { isAdmin, isAuth } from "@/utils/auth";
import { onError } from "@/utils/error";

const handler = nextConnect({ onError });
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
});

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();
    await db.disconnect();
    res.send({ message: "User Updated Sucessfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }

  //   await db.disconnect();
});
handler.delete(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);

  if (user) {
    await user.deleteOne();
    await db.disconnect();
    res.send({ message: "User Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
});

export default handler;
