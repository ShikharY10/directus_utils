const sgMail = require('@sendgrid/mail')
const twilio = require('twilio');

function getBaseUrl() {
	var baseURL = "";
	if (process.env.ENVIRONMENT == "local") {
		baseURL = process.env.DIRECTUS_LOCAL_BASE_URL;		
	} else if (process.env.ENVIRONMENT == "remote") {
		baseURL = process.env.DIRECTUS_REMOTE_BASE_URL;
	}
	console.error(`[RUNNING IN ${process.env.ENVIRONMENT} ENVIRONMENT]`);
	return baseURL;
}

function createResponse(success, error, data=null, object=null, warning=null) {
	return {success, error, data, object, warning};
}

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