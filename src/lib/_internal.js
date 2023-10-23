function getBaseUrl() {
	var baseURL = "";
	if (process.env.ENVIRONMENT == "local") {
		baseURL = process.env.DIRECTUS_LOCAL_BASE_URL;		
	} else if (process.env.ENVIRONMENT == "remote") {
		baseURL = process.env.DIRECTUS_REMOTE_BASE_URL;
	}

	if (process.env.MODE == "dev") {
		console.error(`[RUNNING IN ${process.env.ENVIRONMENT} ENVIRONMENT]`);
	}
	
	return baseURL;
}

module.exports = {
    getBaseUrl
}