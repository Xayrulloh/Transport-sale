const ADD_BRANCH = `
    insert into branches(
        branchName, 
        branchAdress
    ) values ($1, $2)
    returning *
`

const CHANGE_BRANCH = `
    update branches set 
        branchname = $2, 
        branchadress = $3 
    where branchId = $1
    returning *
`

const DELETE_BRANCH = `
    delete from branches where branchId = $1 returning *
`

const OWN_PERMISSION = `
    select 
        * 
    from permissions 
    where staffid = $1;
`

const BRANCHES = `
    select 
        * 
    from branches
`

export default {
    ADD_BRANCH,
    CHANGE_BRANCH,
    DELETE_BRANCH,
    OWN_PERMISSION,
    BRANCHES
}



