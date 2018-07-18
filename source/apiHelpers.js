import axios from "axios"

"use strict"

function getUrl(endpoint, id="") {
    // url = `http://192.168.33.10/intersession/web/app_dev.php/${endpoint}/${id}`
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
    "apiPost": apiPost
}

export default apiHelpers