const ADD_TRANSPORT = `
    insert into transports(
        branchId,
        model,
        color,
        img
    ) values ($1, $2, $3, $4)
    returning *
`

const CHANGE_TRANSPORT = `
    update transports set 
        branchId = $2,
        model = $3,
        color = $4,
    where transportid = $1
    returning *
`

const DELETE_TRANSPORT = `
    delete from transport where transportId = $1 returning *
`



export default {
    ADD_TRANSPORT,
    CHANGE_TRANSPORT,
    DELETE_TRANSPORT,
}



