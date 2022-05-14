import query from './sql.js'
import db from '#pg'

async function addTransport({ branchId, model, color, img }) {
    const [transport] = await db(query.ADD_TRANSPORT, branchId, model, color, img)
    return transport
}

async function changeTransport({ transportId, model, color }) {
    const [transport] = await db(query.CHANGE_TRANSPORT, transportId, model, color)
    return transport
}

async function deleteTransport({ transportId }) {
    const [transport] = await db(query.DELETE_TRANSPORT, transportId)
    return transport
}

export default {
    addTransport,
    changeTransport,
    deleteTransport
}