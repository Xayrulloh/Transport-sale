import { NotFoundError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
import model from './model.js'
import branchModel from '../branch/model.js'

export default {
    Mutation: {
        addPermission: async (_, args, global) => {
            try {
                let result = await checkStaff(global)
                const response = await branchModel.ownPermission(args.staffId)

                if (result?.message || !result || !result.toall) throw new NotFoundError('You can\'t add permission')
                if (!result[args.permissionModule]) throw new NotFoundError('This permission does not exist in our database')
                if ((isNaN(+args.value) && args.value != 'true') || response[args.permissionModule].toString().split('-').includes(args.value)) {throw new NotFoundError('Invalid input')}
                if (['add_branch', 'toall', 'read_transport', 'read_branch', 'read_permission', 'read_stuff'].includes(args.permissionModule)) {
                    if (args.value != 'true') {throw new NotFoundError('Invalid input')}
                    
                    args.value = args.value == 'true' ? true : ''
                    
                    const permission = await model.addPermission(args)
                    return {
                        status: 200,
                        message: "The permission added!",
                        data: permission
                    }
                }
                
                let resolve = await branchModel.branches()
                if (!resolve.find(el => el.branchid == args.value)) throw new NotFoundError('You can\'t add permission')
                if (response[args.permissionModule].length) {
                    args.value = response[args.permissionModule] + '-' + args.value
                    const permission = await model.addPermission(args)
                    return {
                        status: 200,
                        message: "The permission added!",
                        data: permission
                    }
                } else if (!response[args.permissionModule].length) {
                    const permission = await model.addPermission(args)
                    return {
                        status: 200,
                        message: "The permission added!",
                        data: permission
                    }
                } 
                throw new NotFoundError('You can\'t add permission')

            } catch (error) {
                throw error
            }
        },
        deletePermission: async (_, args, global) => {
            try {
                let result = await checkStaff(global)
                const response = await branchModel.ownPermission(args.staffId)

                if (result?.message || !result || !result.toall) throw new NotFoundError('You can\'t delete permission')
                if (!result[args.permissionModule]) throw new NotFoundError('This permission does not exist in our database')
                if ((isNaN(+args.value) && args.value != 'false') || !response[args.permissionModule].toString().split('-').includes(args.value)) {throw new NotFoundError('Invalid input')}
                if (['add_branch', 'toall', 'read_transport', 'read_branch', 'read_permission', 'read_stuff'].includes(args.permissionModule)) {
                    if (args.value != 'false') {throw new NotFoundError('Invalid input')}
                    
                    args.value = args.value == 'false' ? false : ''
                    
                    const permission = await model.addPermission(args)
                    return {
                        status: 200,
                        message: "The permission deleted!",
                        data: permission
                    }
                }

                let resolve = await branchModel.branches()
                if (!resolve.find(el => el.branchid == args.value)) throw new NotFoundError('You can\'t delete permission')
                
                if (response[args.permissionModule].length) {
                    console.log(response[args.permissionModule].split('-'));
                    args.value = response[args.permissionModule].split('-').filter(el => el != args.value).join('-');
                    const permission = await model.addPermission(args)
                    return {
                        status: 200,
                        message: "The permission deleted!",
                        data: permission
                    }
                } else {throw new NotFoundError('You can\'t delete permission')}

            } catch (error) {
                throw error
            }
        }
    },

    Permission: {
        permissionid: global => global.permissionid,
        staffid: global => global.staffid,
        add_transport: global => global.add_transport,
        change_transport: global => global.change_transport,
        delete_transport: global => global.delete_transport,
        add_branch: global => global.add_branch,
        change_branch: global => global.change_branch,
        delete_branch: global => global.delete_branch,
        toall: global => global.toall,
        read_transport: global => global.read_transport,
        read_branch: global => global.read_branch,
        read_permision: global => global.read_permission,
        read_stuff: global => global.read_stuff,
    }
}