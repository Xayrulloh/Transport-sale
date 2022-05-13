import query from './sql.js'
import db from '#pg'

async function addTransport({ branchId, model, color, img }) {
    const [transport] = await db(query.ADD_TRANSPORT, branchId, model, color, img)
    return transport
}

async function changeTransport({ transportid, branchId, model, color, img }) {
    const [transport] = await db(query.CHANGE_TRANSPORT, transportid, branchId, model, color, img)
    return transport
}

async function deleteTransport({ transportid }) {
    const [transport] = await db(query.DELETE_TRANSPORT, transportid)
    return transport
}

export default {
    addTransport,
    changeTransport,
    deleteTransport
}