import axios from "axios"

"use strict"

async function apiGet(endpoint, id = "") {
    const url = `http://192.168.33.10/intersession/web/app_dev.php/${endpoint}/${id}`
    try {
        return await axios.get(url)
    } catch (error) {
        console.error(error)
    }
}

function apiPost(payload, endpoint, id = "") {
    const params = typeof payload === 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&')
    const url = `http://192.168.33.10/intersession/web/app_dev.php/${endpoint}/${id}`

    const xhttp = new XMLHttpRequest()
    xhttp.open('POST', url, true)
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState > 3 && xhttp.status === 200) {
            success(xhttp.responseText)
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhttp.send(params)
    return xhttp
}

const apiHelpers = {
    "apiGet": apiGet,
    "apiPost": apiPost
}

export default apiHelpers