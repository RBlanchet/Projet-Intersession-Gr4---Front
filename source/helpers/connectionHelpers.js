import apiHelpers from "./apiHelpers"

const storage = window.localStorage

function isAuthenticated() {
    // TODO: validate Token age
    // 1 minute: 60 * 1000ms
    const tokenAge = (new Date().getTime()) - parseInt(storage.getItem("Date"))

    if (!storage.getItem("Auth-Token")) {
        if (window.location.hash !== "#/") {
            window.location.hash = "#/"
        }
        return false
    }
    return true
}

function loginUser(response) {
    if (response.status === 201) {
        const token = response.data.value
        const createdAt = Date.parse(response.headers.date)
        console.log(createdAt)
        storage.setItem("Auth-Token", token)
        storage.setItem("Date", String(createdAt))
    }
    console.log(response)
    debugger
    return isAuthenticated()
}

function logoutUser() {
    storage.clear()
}

function getUserInfo() {
    // if (cacheAge >= 60 * 60 * 1000) {
    //     reloadUserInfo()
    // }
    // const user = JSON.parse(storage.getItem("user"))
    // if (user) {
    //     const userRoles = JSON.parse(storage.getItem("userRoles"))
    //     return {
    //         "user": user,
    //         "protectedRoles": userRoles,
    //     }
    // } else {
    //     return false
    // }
    return false
}

const connectionHelpers = {
    "isAuthenticated": isAuthenticated,
    "loginUser": loginUser,
    "getUserInfo": getUserInfo,
    "logoutUser": logoutUser,
}

export default connectionHelpers