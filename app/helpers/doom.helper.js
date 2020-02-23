const errorCode = {
    // Wrong data. To send the correct data you need to use the documentation.
    validation: 100,

    // content-language not found
    contentLanguageNotFound: 101,

    // Language is not supported.
    contentLanguage: 102,

    // This email is not found in the database.
    emailNotFound: 110,

    // Password does not match email.
    passwordNotValid: 121,

    // The administrator has not yet entered the admin panel.
    adminNotLogin: 130,

    // Old password is incorrect.
    emailNotBeSame: 140,

    // Old password is incorrect.
    passwordNotBeSame: 141,

    // The password should not be the same.
    oldPasswordIsIncorrect: 142,

    /**
     * This email has already been registered.
     * Therefore, we can not register it twice.
     * So, as it is already in our database.
     */
    emailAlreadyRegistered: 150,

    // User is not found.
    userNotFound: 160,

    // User is not found.
    publicationNotFound: 170,
};

const error = {
    validation: (res, error) => {
        return res.status(422).json({
            success: false,
            message: error.message.replace(/"/g, ''),
            error: 'Bad request',
            errorCode: errorCode.validation
        });
    },

    emailNotFound: (email) => {
        return {
            statusCode: 401,
            success: false,
            message: `This email: '${email}' is not found.`,
            error: "Access Denied",
            errorCode: errorCode.emailNotFound
        }
    },

    passwordNotValid: () => {
        return {
            statusCode: 401,
            success: false,
            message: 'Password is not valid.',
            error: "Access Denied",
            errorCode: errorCode.passwordNotValid
        }
    },

    tokenNotFound: (res) => {
        return res.status(401).json({
            success: false,
            message: 'To pass the identification, we need a token.',
            error: "Token not found",
            errorCode: errorCode.tokenNotFound
        });
    },

    tokenNotValid: (res) => {
        return res.status(401).json({
            success: false,
            message: 'Token failed validation.',
            error: "Unauthorized access",
            errorCode: errorCode.tokenNotValid
        });
    },

    tokenExpired: (res) => {
        return res.status(401).json({
            success: false,
            message: 'Token lifetime expired.',
            error: "Unauthorized access",
            errorCode: errorCode.tokenExpired
        });
    },

    emailAlreadyRegistered: () => {
        return {
            statusCode: 409,
            success: false,
            message: 'This email is already registered.',
            error: "Conflict",
            errorCode: errorCode.emailAlreadyRegistered
        }
    },

    userNotFound: () => {
        return {
            statusCode: 404,
            success: false,
            message: 'User is not found.',
            error: "Bad request",
            errorCode: errorCode.userNotFound
        }
    },

    publicationNotFound: () => {
        return {
            statusCode: 404,
            success: false,
            message: 'Publication is not found.',
            error: "Bad request",
            errorCode: errorCode.publicationNotFound
        }
    },
};

module.exports = {
    errorCode,
    error
};
