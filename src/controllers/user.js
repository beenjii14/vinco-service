import mongoose from 'mongoose';
import messages from '../messages';
import User from '../models/User';
import {
  encryptPassword,
  Error,
  isValidEmail,
  Logger,
  Success,
} from '../utils';

export const getUsers = async (req, res) => {
  const { admin } = req.query;
  const query = admin ? { role: 'admin', active: true } : { active: true };
  try {
    const users = await User.find(query);
    Success({ res, data: users });
  } catch (error) {
    Logger.error(error.message);
    Error({ res, message: messages.en.query });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Error({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400,
    });
  }
  try {
    const user = await User.find({ _id: id, active: true });
    if (!user || !user.length)
      return Success({
        res,
        message: messages.en.user.notFound,
        statusCode: 404,
        data: {},
      });
    Success({ res, data: user });
  } catch (error) {
    Logger.error(error.message);
    Error({ res, message: messages.en.query });
  }
};

export const createUser = async (req, res) => {
  const { name, firstName, lastName, email, password, role, avatar } = req.body;
  if (
    !name ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !isValidEmail(email)
  ) {
    return Error({
      res,
      message: messages.en.required,
      statusCode: 400,
    });
  }
  const passwordHash = await encryptPassword(password);
  const userExists = await User.findOne({ email });
  if (userExists)
    return Error({ res, message: messages.en.user.exists, statusCode: 400 });
  try {
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      avatar,
      password: passwordHash,
      role,
    });
    Success({ res, data: user, statusCode: 201 });
  } catch (error) {
    Logger.error(error.message);
    Error({ res, message: messages.en.query });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Error({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400,
    });
  }
  const { name, firstName, lastName, email, password, role, active, avatar } =
    req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        firstName,
        lastName,
        email,
        password,
        avatar,
        role,
        active,
        updateAt: ~~(new Date().getTime() / 1e3),
      },
      { new: true }
    );
    if (!user)
      return Success({
        res,
        message: messages.en.user.notFound,
        statusCode: 404,
        data: {},
      });
    Success({ res, data: user });
  } catch (error) {
    Logger.error(error.message);
    Error({ res, message: messages.en.query });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Error({
      res,
      message: messages.en.user.invalidId,
      statusCode: 400,
    });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { active: false, updateAt: ~~(new Date().getTime() / 1e3) },
      { new: true }
    );
    if (!user)
      return Success({
        res,
        message: messages.en.user.notFound,
        statusCode: 404,
        data: {},
      });
    Success({ res, data: user });
  } catch (error) {
    Logger.error(error.message);
    Error({ res, message: messages.en.query });
  }
};
