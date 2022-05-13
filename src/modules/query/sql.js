const GET_TRANSPORTS = `
    select 
        *
    from transports
    where 
        model::varchar ilike concat('%', $3::varchar, '%') or
        color::varchar ilike concat('%', $3::varchar, '%') or
        branchid::varchar ilike concat('%', $3::varchar, '%')
    order by
        case 
        when $4::varchar = 'byDate' and $5 = 1 then transportaddedat
        end asc,
        case 
        when $4::varchar = 'byDate' and $5 = 2 then transportaddedat
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 1 then model
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 2 then model
        end asc
    offset $1::Int limit $2
`

const GET_STAFFS = `
    select 
        *
    from staffs
    where 
        staffname::varchar ilike concat('%', $3::varchar, '%') or
        gender::varchar ilike concat('%', $3::varchar, '%') or
        branchid::varchar ilike concat('%', $3::varchar, '%')
    order by
        case 
        when $4::varchar = 'byDate' and $5 = 1 then birthdate
        end asc,
        case 
        when $4::varchar = 'byDate' and $5 = 2 then birthdate
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 1 then staffname
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 2 then staffname
        end asc
    offset $1::Int limit $2 
`

const GET_STAFF = `
    select * from staffs where staffid::varchar = $1::varchar
`

const GET_BRANCHES = `
    select 
        *
    from branches
    where 
        branchname::varchar ilike concat('%', $3::varchar, '%') or
        branchadress::varchar ilike concat('%', $3::varchar, '%')
    order by
        case 
        when $4::varchar = 'byDate' and $5 = 1 then branchaddedat
        end asc,
        case 
        when $4::varchar = 'byDate' and $5 = 2 then branchaddedat
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 1 then branchname
        end desc,
        case 
        when $4::varchar = 'byName' and $5 = 2 then branchname
        end asc
    offset $1::Int limit $2 
`

const GET_PERMISSIONS = `
    select * from permissions
`

const GET_PERMISSION = `
    select * from permissions where permissionid::varchar = $1::varchar
`

const GET_TRANSPORT = `
    select 
        *
    from transports
    where transportid = $1
`

export default {
    GET_TRANSPORTS,
    GET_TRANSPORT,
    GET_STAFFS,
    GET_STAFF,
    GET_BRANCHES,
    GET_PERMISSIONS,
    GET_PERMISSION
}