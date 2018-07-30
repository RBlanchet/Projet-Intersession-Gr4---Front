import {schema} from 'normalizr'



const job = new schema.Entity('jobs')
const project = new schema.Entity('projects')
const task = new schema.Entity('tasks')

let role, user

user = new schema.Entity("users", {
    roles: [role],
    job: job,
})


role = new schema.Entity("roles", {
    project: project,
    user: user,
    job: job,
})

export {job, project, task, user, role}