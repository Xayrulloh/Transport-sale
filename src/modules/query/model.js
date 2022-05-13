import query from './sql.js'
import db from '#pg'

async function getTransports({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_TRANSPORTS,
        (page - 1) * limit,
        limit,
        search,
        sortKey,
        sortValue
    )
}
async function getTransport({ transportid }) {
    const [transport] = await db(query.GET_TRANSPORT, transportid)
    return transport
}

async function getStaffs({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_STAFFS,
        (page - 1) * limit,
        limit,
        search,
        sortKey,
        sortValue
    )
}
async function getStaff({ staffid }) {
    const staff = await db(query.GET_STAFF, staffid)
    return staff
}

async function getBranches({ page, limit, search, sortKey, sortValue }) {
    return await db(
        query.GET_BRANCHES,
        (page - 1) * limit,
        limit,
        search,
        sortKey,
        sortValue
    )
}

async function getPermissions() {
    const permissions = await db(query.GET_PERMISSIONS)
    return permissions
}

export default {
    getTransports,
    getTransport,
    getStaffs,
    getStaff,
    getBranches,
    getPermissions
}