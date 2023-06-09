const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateHashedPassword = async (password) => {
  const securedPassword = await bcryptjs.hash(password?.toString(), 10);
  return securedPassword;
};

const generateAccessToken = (userObj, source) => {
  const accessToken = jwt.sign(
    {
      data: userObj,

      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hr
    },
    process.env[`${source}_PRIVATE_KEY`],
    {}
  );
  return accessToken;
};

module.exports = { generateHashedPassword, generateAccessToken };
