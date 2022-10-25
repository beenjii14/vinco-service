export const Success = ({ res, data, message = '', statusCode = 200 }) => {
  res.status(statusCode).send({
    statusCode,
    error: false,
    message,
    data,
  });
};

export const Error = ({ res, message, statusCode = 500 }) => {
  res.status(statusCode).send({
    statusCode,
    error: true,
    message,
    data: [],
  });
};
