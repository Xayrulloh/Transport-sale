import query from './sql.js'
import db from '#pg'

async function addBranch({ branchname, address }) {
    const [branch] = await db(query.ADD_BRANCH, branchname, address)
    return branch
}

async function changeBranch({ branchId, branchname, address }) {
    const [branch] = await db(query.CHANGE_BRANCH, branchId, branchname, address)
    return branch
}

async function deleteBranch({ branchId }) {
    const [branch] = await db(query.DELETE_BRANCH, branchId)
    return branch
}

async function ownPermission(staffid) {
    const [permission] = await db(query.OWN_PERMISSION, staffid)
    return permission
}

async function branches() {
    const branch = await db(query.BRANCHES)
    return branch
}

export default {
    addBranch,
    changeBranch,
    deleteBranch,
    ownPermission,
    branches
}