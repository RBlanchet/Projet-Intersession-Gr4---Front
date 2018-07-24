import {schema} from 'normalizr'


const role = new schema.Entity('roles')
const job = new schema.Entity('jobs')

const user = new schema.Entity("users", {
    roles: [role],
    job: job,
})

const usersSchema = [user]
export default usersSchema