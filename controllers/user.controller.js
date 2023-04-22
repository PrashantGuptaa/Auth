const Logger = require("bunyan");
const mongoose = require("mongoose");
const {
  USER_EXISTS,
  PASSWORD_LENGTH_ERROR,
  MANDATORY_FIELD_MISSING,
  USER_REGISTER_SUCCESS,
  PASSWORD_NO_MATCH,
  MISSING_SOURCE,
  MULTIPLE_ACCOUNT_EXISTS,
  NO_ACCOUNT,
  INVALID_DETAILS,
} = require("../configs/constants");
const UserSchema = require("../Schema/userSchema");
const {
  generateHashedPassword,
  generateAccessToken,
} = require("../utils/utils");
const log = new Logger({ name: __filename?.replace(process.cwd(), "") });

const User = mongoose.model("User", UserSchema);

const registerUserController = async (req, res) => {
  log.info("Attempting to register user");
  const { source } = req.headers;
  try {
    const {
      userName,
      email,
      password,
      rePassword,
      customFields = {},
    } = req.body;

    if (!source) {
      return res
        .status(403)
        .json({ errorMessage: MISSING_SOURCE, success: false });
    }

    if (!userName || !email || !password) {
      return res
        .status(403)
        .json({ errorMessage: MANDATORY_FIELD_MISSING, success: false });
    }
    if (password !== rePassword) {
      return res
        .status(403)
        .json({ errorMessage: PASSWORD_NO_MATCH, success: false });
    }

    const existingUser = await User.find({ $or: [{ email, userName }] });
    if (existingUser.length > 0) {
      return res
        .status(403)
        .json({ errorMessage: USER_EXISTS(email, userName), success: false });
    }
    if (password.length < 8) {
      return res
        .status(403)
        .json({ errorMessage: PASSWORD_LENGTH_ERROR, success: false });
    }

    const securedPassword = await generateHashedPassword(password);

    const dataObj = {
      userName,
      email,
      password: securedPassword,
      customFields,
      source,
    };
    console.log(dataObj);
    const userInstance = new User(dataObj);

    await userInstance.save();
    const accessToken = generateAccessToken(dataObj, source);

    res.status(201).json({
      errorMessage: null,
      success: true,
      resp: { message: USER_REGISTER_SUCCESS, accessToken },
    });
  } catch (e) {
    log.error("Error while registering user", e);
    res.status(500).json({ errorMessage: e.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    log.info(`Attemping to login user with user name: ${userName}`);

    const existingUser = await User.find({ userName });
    if (result.length > 1) {
      return res
        .status(409)
        .json({ success: false, errorMessage: MULTIPLE_ACCOUNT_EXISTS });
    }
    if (result.length === 0) {
      return res.status(404).json({ success: false, errorMessage: NO_ACCOUNT });
    }

    const userDetails = existingUser[0];
    const securedPassword = userDetails.password;
    const compareResult = await bcryptjs.compare(password, securedPassword);
    if (!compareResult) {
      return res
        .status(404)
        .json({ success: false, errorMessage: INVALID_DETAILS });
    }
    yekolaLogger.info("Successfully verfied user");
    return res
      .status(200)
      .json({ success: true, errorMessage: null, resp: { userDetails } });
  } catch (e) {
    log.error("Error while logging in user", e);
    res.status(500).json({ errorMessage: e.message });
  }
};
module.exports = { registerUserController, loginUserController };
