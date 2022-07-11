const error500 = {
    error: 500,
    reason: 'Operation not possible. Server Error',
}

const error400 = {
    error: 400,
    reason: 'Bad Request',
}

const error404 = {
    error: 404,
    reason: 'Not Found',
}

const error401 = {
    error: 401,
    reason: 'Unauthorized',
}

module.exports = {
    error500,
    error400,
    error404,
    error401,
}
