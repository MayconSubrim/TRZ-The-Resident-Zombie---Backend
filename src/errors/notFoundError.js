module.exports = function notFoundError(message) {
  return {
    name: "NotFoundError",
    message: message,
  };
};
