import query from './sql.js'
import db from '#pg'

async function addStaff({ staffname, password, branchId, birthdate, gender }) {
    const [staff] = await db(query.ADD_STAFF, staffname, password, branchId, birthdate, gender)
    return staff
}

async function addPermission({ staffid }) {
    const [staff] = await db(query.ADD_PERMISSION, staffid)
    return staff
}

async function login({ staffname, password, }) {
    const [staff] = await db(query.GET_STAFF, staffname, password)
    return staff
}


export default {
    addStaff,
    login,
    addPermission
}