const {getBaseUrl} = require("./_internal")
const { v4: uuidv4 } = require('uuid');

/**
 * Creates a response object
 * @param {boolean} success Specifies whether the request is successful or failed
 * @param {any | null} error If any error happen then that error should be send in response using this field
 * @param {object | null} data If success, then data should be send in response using this field
 * @param {string | null} object Optional. waht is object referrance name that we are send in response using `data` field
 * @param {string | null} warning For sending any warning using response body
 * @returns {object} Response object
 */
function createResponse(success, error, data=null, object=null, warning=null) {
	return {success, error, data, object, warning};
}

/**
 * Generate UUID using npm uuid package
 * @returns {string} return uuid in string type
 */
function generateUuId() {
	const uuid = uuidv4();
	return uuid;
}

module.exports = {
    getBaseUrl,
    createResponse,
    generateUuId
}