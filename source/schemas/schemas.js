import {schema} from 'normalizr'

const job = new schema.Entity('jobs')
const project = new schema.Entity('projects')
const taskStatus = new schema.Entity('taskStatus')
const status = new schema.Entity('status')


let role, user, task

user = new schema.Entity("users", {
    roles: [role],
    job: job,
})


role = new schema.Entity("roles", {
    project: project,
    user: user,
    job: job,
})

task = new schema.Entity("tasks", {
    status: status,
    users: [user]
})


export {job, project, task, user, role, taskStatus}