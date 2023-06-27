import db from "@/utils/db";
import nextConnect from "next-connect";
import User from "@/models/User";
import { isAdmin, isAuth } from "@/utils/auth";
import { onError } from "@/utils/error";

const handler = nextConnect();
handler.use(isAuth, isAdmin);
handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default handler;
