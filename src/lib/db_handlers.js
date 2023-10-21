const axios = require("axios");

/**
 * @param {string} collection directus collection name
 * @param {string} item Id of the record of a collection
 * @param {object} query Query object 
 * @param {boolean} isCustom Specifies this operation is done on default collection or normal collection
 * @returns {object} Returns collection record object
 */
async function readCollectionDataById(collection, item, query, isCustom = true) {
	var url = isCustom ? `${BASE_URL}/items/${collection}/${item}?` : `${BASE_URL}/${collection}/${item}?`;

	if (query != null) {
		Object.entries(query).forEach(([key, value]) => {
			console.log("Key: ", key, " | Value: ", value);
			if (key == "filter") {
				url = `${url}${key}=${JSON.stringify(value)}&`;
			} else {
				url = `${url}${key}=${value}&`;
			}
		});
	}

  console.log("url: ", url);

	let createGetConfig = {
		method: 'get',
		maxBodyLength: Infinity,
		url: url,
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': `Bearer ${ADMIN_STATIC_TOKEN}`
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
 * @param {boolean} expectMultiple specifies whether to expect list of object or just a onject from the response
 * @param {boolean} isCustom Specifies this operation is done on default collection or normal collection
 * @returns {object} Returns collection read object or list based `expectMultiple` params
 */
async function readCollectionDataByQuery(collection, query, expectMultiple=false, isCustom=true) {
	var url = isCustom ? `${BASE_URL}/items/${collection}?` : `${BASE_URL}/${collection}`

	Object.entries(query).forEach(([key, value]) => {
		if (key == "filter") {
			url = `${url}${key}=${JSON.stringify(value)}&`
		} else {
			url = `${url}${key}=${value}&`
		}
	});

	console.log("READ URL: ", url);

	let createGetConfig = {
		method: 'get',
		maxBodyLength: Infinity,
		url: url,
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': `Bearer ${process.env.STATIC_ACCESS_TOKEN}`
		},
	};

	const response = await axios.request(createGetConfig)
	if (response.status == 200) {
		if (expectMultiple) {
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
 * @param {boolean} isCustom Specifies this operation is done on default collection or normal collection
 * @returns {object} returns updated object
 */
async function updateCollectionDataById(collection, item, body, isCustom = true) {
	const url = isCustom ? `${BASE_URL}/items/${collection}/${item}` : `${BASE_URL}/${collection}/${item}`;
	const data = JSON.stringify(body);
	
	let createPatchConfig = {
		method: 'patch',
		maxBodyLength: Infinity,
		url: url,
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': `Bearer ${process.env.STATIC_ACCESS_TOKEN}`
		},
		data : data
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
 * @param {boolean} isCustom Specifies this operation is done on default collection or normal collection
 * @returns {object} returns new created record
 */
async function createCollectionData(collection, body, isCustom = true) {
	const url = isCustom ? `${BASE_URL}/items/${collection}` : `${BASE_URL}/${collection}`;
	const data = JSON.stringify(body);
	
	let createPatchConfig = {
		method: 'post',
		maxBodyLength: Infinity,
		url: url,
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': `Bearer ${process.env.STATIC_ACCESS_TOKEN}`
		},
		data : data
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
 * @returns {boolean} returns true or false based success and failure
 */
async function deleteCollectionData(collection, itemId) {
	const url = `${BASE_URL}/items/${collection}/${itemId}`;
	
	let createPatchConfig = {
		method: 'delete',
		maxBodyLength: Infinity,
		url: url,
		headers: { 
			'Content-Type': 'application/json', 
			'Authorization': `Bearer ${process.env.STATIC_ACCESS_TOKEN}`
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