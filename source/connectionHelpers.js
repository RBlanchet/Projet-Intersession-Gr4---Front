import apiHelpers from "./apiHelpers"

const storage = window.localStorage

function isAuthenticated() {
    return getUserInfo() !== false
}

/**
 * To be used ONLY by the login component
 * */
function loginUser() {
    reloadUserInfo()
    return isAuthenticated()
}

function logoutUser() {
    apiHelpers.apiGet("logout")
    storage.clear()
}

function getUserInfo() {
    const cacheAge = (new Date().getTime()) - parseInt(storage.getItem("userSet"))
    if (cacheAge >= 3600) {
        reloadUserInfo()
    }
    const user = JSON.parse(storage.getItem("user"))
    if (user) {
        const userRoles = JSON.parse(storage.getItem("userRoles"))
        return {
            "user": user,
            "protectedRoles": userRoles,
        }
    } else {
        return false
    }
}

function reloadUserInfo() {
    const response = apiHelpers.apiGetSync("me")
    if (response.status !== 200) {
        return false
    }
    const userInfo = JSON.parse(response.responseText)
    const user = userInfo.users.byId[userInfo.users.allId[0]]
    storage.setItem("user", JSON.stringify(user))
    storage.setItem("userRoles", JSON.stringify(userInfo.protectedRoles))
    storage.setItem("userSet", String(new Date().getTime()))
}

const connectionHelpers = {
    "isAuthenticated": isAuthenticated,
    "loginUser": loginUser,
    "getUserInfo": getUserInfo,
    "logoutUser": logoutUser,
}

export default connectionHelpers