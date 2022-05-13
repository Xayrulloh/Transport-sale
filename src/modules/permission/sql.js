const add_transport = `
    update permissions set 
        add_transport = $2
    where staffid = $1
    returning *
`
const change_transport = `
    update permissions set 
        change_transport = $2
    where staffid = $1
    returning *
`
const delete_transport = `
    update permissions set 
        delete_transport = $2
    where staffid = $1
    returning *
`

const add_branch = `
    update permissions set 
        add_branch = $2
    where staffid = $1
    returning *
`
const change_branch = `
    update permissions set 
        change_branch = $2
    where staffid = $1
    returning *
`
const delete_branch = `
    update permissions set 
        delete_branch = $2
    where staffid = $1
    returning *
`
const toall = `
    update permissions set 
        toall = $2
    where staffid = $1
    returning *
`
const read_transport = `
    update permissions set 
        read_transport = $2
    where staffid = $1
    returning *
`
const read_branch = `
    update permissions set 
        read_branch = $2
    where staffid = $1
    returning *
`
const read_permission = `
    update permissions set 
        read_permission = $2
    where staffid = $1
    returning *
`
const read_stuff = `
    update permissions set 
        read_stuff = $2
    where staffid = $1
    returning *
`


export default {
    add_transport,
    change_transport,
    delete_transport,
    add_branch,
    change_branch,
    delete_branch,
    toall,
    read_transport,
    read_branch,
    read_permission,
    read_stuff
}