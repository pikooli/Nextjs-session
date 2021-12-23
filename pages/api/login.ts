import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/session";

import prisma from "lib/prisma";
import bcrypt from "bcryptjs";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  console.log(req.session);
  if (user) {
    req.session.user = user;
    await req.session.save();
    res.json({ user });
  } else res.status(404).send("");
}
