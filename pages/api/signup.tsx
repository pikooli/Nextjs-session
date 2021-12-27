import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import joiUtils from 'utils/joiUtils';
import prisma from 'lib/prisma';
import bcrypt from 'bcryptjs';

//
const joi = Joi.object({
  firstname: Joi.string().required().messages({
    'string.base': `errors.signup.firstname.firstname`,
    'string.empty': `errors.signup.firstname.empty`,
    'any.required': `errors.signup.firstname.required`
  }),
  lastname: Joi.string().required().messages({
    'string.base': `errors.signup.lastname.lastname`,
    'string.empty': `errors.signup.lastname.empty`,
    'any.required': `errors.signup.lastname.required`
  }),
  email: Joi.string().email().required().messages({
    'string.base': `errors.signup.email.email`,
    'string.empty': `errors.signup.email.empty`,
    'any.required': `errors.signup.email.required`
  }),
  password: Joi.string().required().messages({
    'string.base': `errors.signup.password.password`,
    'string.empty': `errors.signup.password.empty`,
    'any.required': `errors.signup.password.required`
  }),
  re_password: Joi.string().required().messages({
    'string.base': `errors.signup.re_password.re_password`,
    'string.empty': `errors.signup.re_password.empty`,
    'any.required': `errors.signup.re_password.required`
  })
});

//
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = joi.validate(req.body, { abortEarly: false });
  if (form.error) {
    return res.status(500).json(joiUtils.getErrors(form.error.details));
  }
  const { firstname, lastname, email, password, re_password } = form.value;
  if (password !== re_password) {
    return res
      .status(500)
      .json({ re_password: 'errors.signup.re_password.notsame' });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: form.value.email
    }
  });
  if (user) {
    return res.status(500).send('errors.user.already');
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  const newUser = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hash
    }
  });
  res.send('ok');
}
