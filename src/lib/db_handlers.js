const axios = require("axios");
const { getBaseUrl } = require("./_internal");
/**
 * @param {string} collection directus collection name
 * @param {string} item Id of the record of a collection
 * @param {object} options options, includes: `query` `url`, `token`, `isCustom`
 * @returns {object} Returns collection record object
 */
async function readCollectionDataById(collection, item, options = { isCustom: true }) {
	const baseURL = (options.url != null) ? options.url : getBaseUrl();
	const token = (options.token != null) ? options.token : process.env.STATIC_ACCESS_TOKEN;

	var url = options.isCustom ? `${baseURL}/items/${collection}/${item}?` : `${baseURL}/${collection}/${item}?`;

	if (options.query != null) {
		Object.entries(options.query).forEach(([key, value]) => {
			if (key == "filter") {
				url = `${url}${key}=${JSON.stringify(value)}&`;
			} else {
				url = `${url}${key}=${value}&`;
			}
		});
	}

	let createGetConfig = {
		method: 'get',
		maxBodyLength: Infinity,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	};

	const response = await axios.request(createGetConfig);
	if (response.status == 200) {
		return response.data.data;
	}
}

/**
 * 
 * @param {string} collection directus collection name
 * @param {object} query Query object 
 * @param {object} options options, includes: `url`, `token`, `isCustom`, `expectMultiple`
 * @returns {object} Returns collection read object or list based `expectMultiple` params
 */
async function readCollectionDataByQuery(collection, query, options = { isCustom: true, expectMultiple: false }) {

	const baseURL = (options.url != null) ? options.url : getBaseUrl();
	const token = (options.token != null) ? options.token : process.env.STATIC_ACCESS_TOKEN;

	var url = options.isCustom ? `${baseURL}/items/${collection}?` : `${baseURL}/${collection}?`

	Object.entries(query).forEach(([key, value]) => {
		if (key == "filter") {
			url = `${url}${key}=${JSON.stringify(value)}&`
		} else {
			url = `${url}${key}=${value}&`
		}
	});

	let createGetConfig = {
		method: 'get',
		maxBodyLength: Infinity,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	};

	const response = await axios.request(createGetConfig)
	if (response.status == 200) {
		if (options.expectMultiple) {
			return response.data.data;
		} else {
			return response.data.data[0];
		}

	} else {
		null;
	}
}

/**
 * 
 * @param {string} collection directus collection name
 * @param {string} item Id of the record of a collection
 * @param {object} body data that you want to update
 * @param {object} options options, includes: `url`, `token`, `isCustom`
 * @returns {object} returns updated object
 */
async function updateCollectionDataById(collection, item, body, options = { isCustom: true }) {

	const baseURL = (options.url != null) ? options.url : getBaseUrl();
	const token = (options.token != null) ? options.token : process.env.STATIC_ACCESS_TOKEN;

	const url = options.isCustom ? `${baseURL}/items/${collection}/${item}` : `${baseURL}/${collection}/${item}`;
	const data = JSON.stringify(body);

	let createPatchConfig = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: data
	};

	const response = await axios.request(createPatchConfig);
	if (response.status == 200) {
		return response.data;
	} else {
		return null;
	}
}

/**
 * 
 * @param {string} collection directus collection name
 * @param {object} body data that you want to create
 * @param {object} options options, includes: `url`, `token`, `isCustom`
 * @returns {object} returns new created record
 */
async function createCollectionData(collection, body, options = { isCustom: true }) {

	const baseURL = (options.url != null) ? options.url : getBaseUrl();
	const token = (options.token != null) ? options.token : process.env.STATIC_ACCESS_TOKEN;

	const url = options.isCustom ? `${baseURL}/items/${collection}` : `${baseURL}/${collection}`;
	const data = JSON.stringify(body);

	let createPatchConfig = {
		method: 'post',
		maxBodyLength: Infinity,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: data
	};

	const response = await axios.request(createPatchConfig);
	if (response.status == 200) {
		return response.data.data;
	} else {
		return null;
	}
}

/**
 * 
 * @param {string} collection directus collection name
 * @param {string} itemId Id of the record of a collection
 * @param {object} options options, includes: `url`, `token`
 * @returns {boolean} returns true or false based success and failure
 */
async function deleteCollectionData(collection, itemId, options = { isCustom: true }) {

	const baseURL = (options.url != null) ? options.url : getBaseUrl();
	const token = (options.token != null) ? options.token : process.env.STATIC_ACCESS_TOKEN;

	const url = `${baseURL}/items/${collection}/${itemId}`;

	let createPatchConfig = {
		method: 'delete',
		maxBodyLength: Infinity,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	};

	const response = await axios.request(createPatchConfig);
	if (response.status == 204) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	readCollectionDataById,
	readCollectionDataByQuery,
	updateCollectionDataById,
	createCollectionData,
	deleteCollectionData
}