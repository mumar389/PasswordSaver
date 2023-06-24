const Password = require("../models/password");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
module.exports.savePassword = async (req, res) => {
  try {
    const { title, passkey, link } = req.body;
    if (!title || !passkey) {
      return res.status(301).json({
        message: "Fields cannot be empty",
      });
    }
    const uid = req.user.id;
    let currentUser = await User.findById(uid);
    if (!currentUser) {
      return res.status(422).json({
        message: "Unauthorized Access",
      });
    }
    currentUser.__v=0
    var encrypted = await CryptoJS.AES.encrypt(
      passkey,
      `${process.env.SECRET}`
    );
    // console.log("Uid,enc-:", uid, encrypted);
    let newPassword = await Password.create({
      title,
      passkey: encrypted,
      link,
      user: uid,
    });
    currentUser.key.push(newPassword.id);
    currentUser.save();
    return res.status(200).json({
      message: "Password Saved Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.getPasswords = async (req, res) => {
  try {
    let allPasskeys = await User.findById(req.user.id).populate("key");
    let decryptedPass = [];
    if (!allPasskeys) {
      console.log("Unable to find");
      return res.status(301).json({
        message: "Unable to find",
      });
    }
    // console.log("Passwords-:", allPasskeys);
    allPasskeys.key.map((k, i) => {
      var decrypted = CryptoJS.AES.decrypt(k.passkey, `${process.env.SECRET}`);
      var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      decryptedPass.push({
        _id:k._id,
        title: k.title,
        passkey: plaintext,
        link: k.link,
      });
    });
    // console.log("Decrypted",decryptedPass);
    return res.status(200).json({
      message: "Found All Passwords",
      data: decryptedPass,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports.deletePassKeys = async (req, res) => {
  try {
    let id = req.params.id;
    let uid = req.user.id;
    let currentPassword = await Password.findByIdAndRemove(id);
    let cp = await User.findByIdAndUpdate(uid, { $pull: { key: id } });

    if (!cp) {
      console.log("error in deleting the key");
      return res.status(422).json({
        message: "error in deleting the key",
      });
    }
    return res.status(200).json({
      message: "PassWord Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
