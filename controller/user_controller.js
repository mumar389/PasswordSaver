const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.userHome = async (req, res) => {
  // console.log("User", req.user);
  return res.status(200).json({
    message: "User Home Reached",
  });
};
module.exports.create = async (req, res) => {
  try {
    const { name, email, password, cp } = req.body;
    if (!name || !email || !password || !cp) {
      // console.log("Fields cannot be empty");
      return res.status(301).json({
        message: "Fields cannot be empty",
      });
    }
    if (password !== cp) {
      // console.log("Please Enter a valid password");
      return res.status(301).json({
        message: "Please Enter a valid password",
      });
    }
    let oldUser = await User.findOne({ email });
    if (!oldUser) {
      let hashPwd = await bcrypt.hash(password, 10);
      // console.log(hashPwd);
      let newUser = await User.create({
        name,
        email,
        password: hashPwd,
      });
      let token = jwt.sign(newUser.toJSON(), `${process.env.SECRET}`, {
        expiresIn: "10000000",
      });
      // console.log("New User Created Sucessfully", newUser);
      return res.status(200).json({
        message: "User Registered Sucessfully",
        data:token
      });
    } else {
      // console.log("User with this email already exists");
      return res.status(422).json({
        message: "User with this email already exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // console.log("Fields cannot be empty");
      return res.status(301).json({
        message: "Fields cannot be empty",
      });
    }
    let existUser = await User.findOne({ email: email });
    if (!existUser) {
      return res.status(422).json({
        message: "Invalid credentials",
      });
    } else {
      let result = await bcrypt.compare(password, existUser.password);
      if (!result) {
        return res.status(422).json({
          message: "Invalid credentials",
        });
      } else {
        let token = jwt.sign(existUser.toJSON(), `${process.env.SECRET}`, {
          expiresIn: "10000000",
        });
        // res.cookie('jwt',token)
        // console.log("Token Created",token);
        return res.status(200).json({
          message: "Login Successfull",
          data: token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.googleHome=async(req,res)=>{
  try {
    // console.log("Logged in",req.user);
    let token = jwt.sign(req.user.toJSON(), `${process.env.SECRET}`, {
      expiresIn: "10000000",
    });
    res.cookie('jwt',token)
    res.cookie("google","pwdsaver")
    return res.redirect('https://pwd-saver.vercel.app/save-password-page')
    // return res.json({token})
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports.logout=async(req,res)=>{
  try {
    req.logout(()=>{
      res.clearCookie("jwt")
      res.clearCookie("google")
      return res.status(200).json({
        message:"Logout Successfull"
      })
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}