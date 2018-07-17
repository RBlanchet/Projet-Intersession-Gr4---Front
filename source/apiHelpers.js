function apiGet(endpoint, id="") {
    return new Promise(function (resolve, reject) {
        const url = `http://192.168.33.10/${endpoint}/${id}`
        const xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve( this.responseText)
            } else if (this.readyState === 4) {
                reject(Error("Api get error: " + this.status))
            }
        }
        xhttp.open("GET", url, true)
        xhttp.send()
    })
}

const apiHelpers = {
    "apiGet": apiGet
}

export default apiHelpers