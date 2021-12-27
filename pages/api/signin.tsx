import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

import joiUtils from 'utils/joiUtils';
import prisma from 'lib/prisma';
import { withSessionRoute } from 'lib/session';

const joi = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `errors.signin.email.lastname`,
    'string.empty': `errors.signin.email.empty`,
    'any.required': `errors.signin.email.required`
  }),
  password: Joi.string().required().messages({
    'string.base': `errors.signin.password.lastname`,
    'string.empty': `errors.signin.password.empty`,
    'any.required': `errors.signin.password.required`
  })
});

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = joi.validate(req.body, { abortEarly: false });
  if (form.error) {
    return res.status(500).json({ user: 'errors.signin.user.badcredential' });
  }
  const { email, password } = form.value;
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });
  if (!user) {
    return res.status(500).json({ user: 'errors.signin.user.badcredential' });
  }
  if (!(await bcrypt.compareSync(password, user.password))) {
    return res.status(500).json({ user: 'errors.signin.user.badcredential' });
  }
  req.session.user = user;
  await req.session.save();
  res.redirect('/');
};

export default withSessionRoute(signin);
