import {schema} from "normalizr"
import user from "./users"

const project = new schema.Entity("jobs")

const role = new schema.Entity("roles", {
    project: project,
    user: user,
})

export default role