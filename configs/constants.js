const USER_EXISTS = (email, name) =>
  `User with email: ${email} or user name: ${name} already exists`;

const PASSWORD_LENGTH_ERROR = "Password should be more than 8 characters";
const MANDATORY_FIELD_MISSING = "Mandatory field missing";

const USER_REGISTER_SUCCESS = "User registered successfully";
const PASSWORD_NO_MATCH = "Password does not match with Re password";
const MISSING_SOURCE = "Source is missing";
const MULTIPLE_ACCOUNT_EXISTS = "Multiple accounts exists with given username";
const NO_ACCOUNT = "No account exists with given username";
const INVALID_DETAILS = "Invalid username or password";

module.exports = {
  USER_EXISTS,
  PASSWORD_LENGTH_ERROR,
  MANDATORY_FIELD_MISSING,
  USER_REGISTER_SUCCESS,
  PASSWORD_NO_MATCH,
  MISSING_SOURCE,
  MULTIPLE_ACCOUNT_EXISTS,
  NO_ACCOUNT,
  INVALID_DETAILS
};
