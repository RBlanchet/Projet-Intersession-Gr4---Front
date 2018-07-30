import apiHelpers from "../helpers/apiHelpers"
import {normalize} from "normalizr"
import projectSchema from "../schemas/projects"
const storage = window.localStorage

function isAuthenticated() {
    // TODO: validate Token age
    // 1 minute: 60 * 1000ms
    const tokenAge = (new Date().getTime()) - parseInt(storage.getItem("Date"))
    if (tokenAge >= (1000 * 60 * 60 * 12)) {
        logoutUser()
    }

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
        storage.setItem("Auth-Token", token)
        storage.setItem("Date", String(createdAt))
    }
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
    // return false
}

const connectionHelpers = {
    "isAuthenticated": isAuthenticated,
    "loginUser": loginUser,
    "getUserInfo": getUserInfo,
    "logoutUser": logoutUser,
}

export default connectionHelpers