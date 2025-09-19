import Users from "../model/user.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // ensures it isn’t accessible via client-side JS
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    username: req.body.username,
    password: req.body.password,
  });
  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) check if email and password exist
  if (!password || !username) {
    return next(new AppError("Please provide username and password", 400));
  }

  // 2) check if the user and password are correct
  const user = await Users.findOne({ username, password });

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) send token
  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2) verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists!", 401)
    );
  }
  // grant access
  req.user = currentUser;
  next();
});
