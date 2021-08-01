import User from "./../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "./../../../config/config";
/**
 * Register user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function register(req, res, next) {
  let newUser = new User();
  if (req.body.email) newUser.email = req.body.email;
  if (req.body.password === req.body.confirmPassword) {
    if (req.body.password) {
      newUser.password = bcrypt.hashSync(req.body.password, 10);
    }
  }

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((e) => next(e));
}

/**
 * Login user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function login(req, res, next) {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) return next(new Error("Email not found."));

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return next(new Error("Wrong password"));
      }
      var payload = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user: user,
        token: token,
      });
    })
    .catch((e) => next(e));
}

export default {
  register,
  login,
};
