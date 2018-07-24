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

async function apiPost(endpoint, payload, id = "") {
    const url = getUrl(endpoint, id)

    try {
        return await axios({
            method: 'post',
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
    "apiPost": apiPost
}

export default apiHelpers