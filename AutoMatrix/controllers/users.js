const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
  create,
  login,
  checkToken,
  getUser
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch (err) {
    console.log(err);
    res.status(400).json("Bad Credentials");
  }
}

async function getUser(req, res) {
  try {
    const user = await User.find().populate('User').then(s => {
      console.log(s);
    }).catch(err => {
      console.log(err);
    })
    console.log(req, res);
  }catch(err) {
    console.log(err);
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}



function createJWT(user) {
  return jwt.sign({ user }, "secret", { expiresIn: "24h" });
}
