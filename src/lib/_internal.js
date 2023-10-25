/**
 * This utlity function is helpfull for accessing correct directus base url based on `ENVIRONMENT` from environment variables.
 * 
 * `ENVIRONMENT` can "local" or "remote"
 * @returns 
 */
function getBaseUrl() {
	var baseURL = "";
	if (process.env.ENVIRONMENT == "local") {
		baseURL = process.env.DIRECTUS_LOCAL_BASE_URL;		
	} else if (process.env.ENVIRONMENT == "remote") {
		baseURL = process.env.DIRECTUS_REMOTE_BASE_URL;
	}
	
	return baseURL;
}

module.exports = {
    getBaseUrl
}