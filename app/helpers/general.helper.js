/**
 * Combines all transferred objects into one.
 */
function assign() {
    let obj = {};

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        Object.keys(arg).forEach((key) => {
            obj[key] = arg[key];
        });
    }

    return obj;
}

/**
 * Deletes the last character of the last element in an array.
 * @param array
 */
function deleteLastCharacterOfLastElementInArray(array) {
    let lastIndex = array.length - 1;
    let lastElement = array[lastIndex];
    array[lastIndex] = lastElement.substring(0, lastElement.length - 1);
}

module.exports = {
    assign,
    deleteLastCharacterOfLastElementInArray
};
