const ErrorHandler = require('../utils/ErrorHadler');

module.exports = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Unexpected error' });
};
