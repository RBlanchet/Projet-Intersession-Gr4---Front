import {normalize, schema} from 'normalizr'

const data = {
    users: [
        {
            username: "test@test.com",
            id: 1,
            protectedRoles: [
                {
                    name: "admin",
                    id: 1
                }
            ]
        },
        {
            username: "truite@tracker.com",
            id: 2,
            protectedRoles: [
                {
                    name: "D",
                    id: 4
                }
            ]
        },
        {
            username: "truite2@tracker.com",
            id: 3,
            protectedRoles: [
                {
                    name: "CP",
                    id: 2
                }
            ]
        },
        {
            username: "truite23@tracker.com",
            id: 123,
            protectedRoles: [
                {
                    name: "LD",
                    id: 3
                }
            ]
        }
    ]

}


const protectedRole = new schema.Entity('protectedRoles')

const user = new schema.Entity("users", {
    protectedRoles: [protectedRole]
})

const usersSchema = {users: [user]}


export default normalize(data, usersSchema)