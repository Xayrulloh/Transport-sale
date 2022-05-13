import query from './sql.js'
import db from '#pg'

async function addPermission({ staffId, permissionModule, value }) {
    const [permission] = await db(query[permissionModule], staffId, value)
    return permission
}

export default {
    addPermission
}