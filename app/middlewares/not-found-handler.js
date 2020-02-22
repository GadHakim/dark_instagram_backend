module.exports = (req, res, next) => {
    const err = new Error('Endpoint not exist.');
    err.status = 404;
    next(err);
};