import axios from "axios"

"use strict"

function getUrl(endpoint, id="") {
    const baseUrl = "http://192.168.33.10/intersession/web/app_dev.php/"
    if (id !== "") {
        return `${baseUrl}${endpoint}/${id}`
    } else {
        return `${baseUrl}${endpoint}`
    }
}

async function apiGet(endpoint, id = "") {
    const url = getUrl(endpoint, id)
    try {
        return await axios.get(url)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Use with caution
 * */
function apiGetSync(endpoint, id="") {
    const url = getUrl(endpoint, id)
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url, false)
    xhttp.send()
    return xhttp
}

async function apiPost(endpoint, payload, id = "") {
    const url = getUrl(endpoint, id)
    const params = typeof payload === 'string' ? payload : Object.keys(payload).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
        }
    ).join('&')

    try {
        return await axios({
            method: 'post',
            url: url,
            data: params
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