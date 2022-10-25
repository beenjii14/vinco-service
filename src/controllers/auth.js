import jwt from 'jsonwebtoken';
import messages from '../messages';
import User from '../models/User';
import { comparePassword, Error, isValidEmail, Success } from '../utils/';

import config from '../../config';

export const auth = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password || !password.trim() || !isValidEmail(email)) {
    return Error({ res: response, message: messages.en.user.required });
  }
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await comparePassword(password, user.password);
  if (!(user && passwordCorrect)) {
    return Error({
      res: response,
      message: messages.en.user.invalidAuth,
      statusCode: 401,
    });
  }
  const createToken = {
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    role: user.role,
    email: user.email,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    id: user._id,
  };
  const token = jwt.sign(createToken, config.secret);

  response.cookie('sToken', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  });

  Success({ res: response, data: { token } });
};

export const logout = async (request, response) => {
  response.clearCookie('sToken');
  Success({ res: response, message: messages.en.user.logout });
};
