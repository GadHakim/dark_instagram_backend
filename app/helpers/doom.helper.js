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

    // Registration failure
    registrationFailure: 151,

    // The token in the request was not found.
    tokenNotFound: 160,

    // The token in the request is not correct.
    tokenNotValid: 161,

    // Token lifetime expired.
    tokenExpired: 162,

    // Token lifetime expired.
    refreshTokenExpired: 163,

    // Refresh token not valid.
    refreshTokenNotValid: 164,

    /**
     * There was an attempt to verify the token that came in the request.
     * This token has not been verified.
     */
    verificationForgotPasswordFailed: 170,

    /**
     * Link lifetime has expired.
     * In order to establish the link lifetime, repeat the previous actions.
     */
    forgotPasswordTimeIsOver: 180,

    /**
     * The message that was sent to the mail has not yet been confirmed.
     * By this we can not continue.
     */
    linkLetterNotConfirmed: 190,

    // User account was not found.
    accountNotFound: 200,

    // The user exited the application. Log in again.
    userLogout: 210,

    // Not found image in array
    notFoundImageInArray: 220,

    // The language in the file should not be repeated.
    conflictLanguage: 230,

    // The number of questions does not converge.
    // The language in which the error was found. Or in front of him.
    numberQuestions: 240,

    // The number of localizations does not match.
    numberLocalizations: 241,

    // The start date of the game should not be more than its end.
    gameRangeTime: 250,

    // The end date of the game should not be less than the destination time of entry into the game.
    gameDestinationTime: 251,

    // Game time should not be included in other ranges of games in the same city.
    gameTimeConflict: 252,

    // The game not found.
    gameNotFound: 260,

    // The game cannot be changed as it has already begun.
    gameAlreadyBegun: 270,

    // The game cannot be deleted. So the game has already begun.
    gameCannotBeDeleted: 280
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
};

module.exports = {
    errorCode,
    error
};
