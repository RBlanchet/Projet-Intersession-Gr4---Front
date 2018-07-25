import axios from "axios"

const storage = window.localStorage

function getUrl(endpoint, id = "") {
    const baseUrl = "http://192.168.33.10/intersession/web/app_dev.php/"
    if (id !== "") {
        return `${baseUrl}${endpoint}/${id}`
    } else {
        return `${baseUrl}${endpoint}`
    }
}

function getHeaders() {
    const token = storage.getItem("Auth-Token")
    if (token) {
        return {
            "content-type": "application/json",
            "X-Auth-Token": token
        }
    } else {
        return {
            "content-type": "application/json"
        }
    }
}

async function apiGet(endpoint, id = "") {
    const url = getUrl(endpoint, id)
    try {
        return await axios({
            method: 'get',
            url: url,
            headers: getHeaders()
        })
    } catch (error) {
        console.error(error)
    }
}

/**
 * Use with caution
 * */
function apiGetSync(endpoint, id = "") {
    const url = getUrl(endpoint, id)
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url, false)
    xhttp.send()
    return xhttp
}

function apiPost(endpoint, payload, id = "") {
    return withPayload("post", endpoint, payload, id)
}

function apiPut(endpoint, payload, id = "") {
    return withPayload("put", endpoint, payload, id)
}

function apiPatch(endpoint, payload, id = "") {
    return withPayload("patch", endpoint, payload, id)
}

async function withPayload(method, endpoint, payload, id) {
    if (!["post", "put", "patch"].includes(method)) {
        throw error(`Incorrect method ${method} for use in withPayload`)
    }

    const url = getUrl(endpoint, id)

    try {
        return await axios({
            method: method,
            url: url,
            data: JSON.stringify(payload),
            headers: getHeaders()
        })
    } catch (error) {
        console.error(error)
    }
}


const apiHelpers = {
    "apiGet": apiGet,
    "apiGetSync": apiGetSync,
    "apiPost": apiPost,
    "apiPatch": apiPatch
}

export default apiHelpers