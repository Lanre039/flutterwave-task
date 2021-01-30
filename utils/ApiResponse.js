module.exports = (res, message, status, data, statusCode = 200) => {
  const response = { message, status, data };
  return res.status(statusCode).json(response);
};
