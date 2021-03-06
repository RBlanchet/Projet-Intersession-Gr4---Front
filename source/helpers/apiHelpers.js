import axios from "axios"

const storage = window.localStorage

function getUrl(endpoint, id = "") {
    const baseUrl = "http://192.168.33.10/app_dev.php/"
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
function getHeadersPDF() {
    const token = storage.getItem("Auth-Token")
    if (token) {
        return {
            "content-type": "application/pdf",
            "X-Auth-Token": token,
            Accept: "application/pdf",

        }
    } else {
        return {
            "content-type": "application/json"
        }
    }
}

function withoutPayload(method, endpoint, id = "") {
    const url = getUrl(endpoint, id)
    return axios({
        method: method,
        url: url,
        headers: getHeaders()
    })
}
function withoutPayloadPDF(method, endpoint, id = "") {
    const url = getUrl(endpoint, id)
    return axios({
        method: method,
        responseType: 'blob',
        url: url,
        headers: getHeadersPDF()
    })
}

function apiGet(endpoint, id = '') {
    return withoutPayload('get', endpoint, id)
}
function apiPDF(endpoint, id = ''){
    return withoutPayloadPDF('get', endpoint, id)
}

function apiDelete(endpoint, id = '') {
    return withoutPayload('delete', endpoint, id)
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

function withPayload(method, endpoint, payload, id) {
    if (!["post", "put", "patch"].includes(method)) {
        throw error(`Incorrect method ${method} for use in withPayload`)
    }

    const url = getUrl(endpoint, id)

    return axios({
        method: method,
        url: url,
        data: JSON.stringify(payload),
        headers: getHeaders()
    })
}


const apiHelpers = {
    "apiGet": apiGet,
    "apiDelete": apiDelete,
    "apiGetSync": apiGetSync,
    "apiPost": apiPost,
    "apiPatch": apiPatch,
    "apiPut": apiPut,
    "apiPDF" : apiPDF,
}

export default apiHelpers