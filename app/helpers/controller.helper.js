const pg = require('../drivers/pg');

async function sendJson(res, action, status = 200) {
    let result = null;

    await pg.transaction(async (connection) => {
        result = await action(connection);
    });

    if (result === null) {
        throw new Error('Transaction not correct.');
    }

    if (result.success) {
        return res.status(status).json(result);
    } else {
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            error: result.error,
            errorCode: result.errorCode
        });
    }
}

async function sendFile(res, action, pathSuccess, pathFail, status = 200) {
    let result = null;

    await pg.transaction(async (connection) => {
        result = await action(connection);
    });

    if (result === null) {
        throw new Error('Transaction not correct.');
    }

    if (result.success) {
        return res.status(status).sendFile(pathSuccess);
    } else {
        return res.status(result.statusCode).sendFile(pathFail);
    }
}

async function sendOnlyFile(res, path, status = 200) {
    return res.status(status).sendFile(path);
}

function send(res, result, status = 200) {
    if (result.success) {
        return res.status(status).json(result);
    } else {
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            error: result.error,
            errorCode: result.errorCode
        });
    }
}

module.exports = {
    sendJson,
    sendFile,
    sendOnlyFile,
    send
};
