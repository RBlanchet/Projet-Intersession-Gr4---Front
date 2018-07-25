import {schema} from 'normalizr'

const job = new schema.Entity('jobs')

const jobSchema = [job]

export default jobSchema