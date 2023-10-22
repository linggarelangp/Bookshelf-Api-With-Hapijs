export const response = (statusCode, status, message, data, res) => res.response({
    status: status,
    message: message,
    data: data,
}).code(statusCode)

export const responseError = (statusCode, status, message, res) => res.response({
    status: status,
    message: message,
}).code(statusCode)
