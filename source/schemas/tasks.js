import {schema} from 'normalizr'

const task = new schema.Entity('tasks')

const taskSchema = [task]

export default taskSchema