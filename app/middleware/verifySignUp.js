const { user } = require("../models");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await user.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Unsuccessful, username already in use!",
      });
    }

    user = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Unsuccessful, user the provided email already exist!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Ops! Unable to load user!",
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (res.body.roles) {
    for (let i = 0; i < res.body.roles.length; i++) {
      if (!ROLES.includes(res.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + res.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
