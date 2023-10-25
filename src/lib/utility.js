const sgMail = require('@sendgrid/mail')
const twilio = require('twilio');
const {getBaseUrl} = require("./_internal")

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

async function sendMail(to, from, subject, text, html) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

	const msg = {
		to: to, // Change to your recipient
		from: from, // Change to your verified sender
		subject: subject,
		text: text,
		html: html,
	};

	sgMail
	.send(msg)
	.then(() => {
		console.log('Email sent')
	})
	.catch((error) => {
		throw new Error(createErrorObject(error, 500));
	})
}

async function sendTextMessage(body, to, from, media) {
    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

	client.messages
	.create({   
		body: body,
		from: from,
		to: to,
		mediaUrl: media
	}) 
	.then(message => console.log(message.sid)) 
	.catch(error => {
		console.log(`[SCHEDULAR ERROR] [SMS] [CODE: ${500}] => ${error}`);
	})
}

module.exports = {
    getBaseUrl,
    createResponse,
    generateUuId,
    sendMail,
    sendTextMessage
}