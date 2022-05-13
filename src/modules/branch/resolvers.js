import { UserInputError } from 'apollo-server-express'
import { NotFoundError } from '#helpers/errors'
import { DatabaseError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
import { PAGINATION_CONFIG } from '#config/index'
import JWT from 'jsonwebtoken'
import model from './model.js'

export default {
    Mutation: {
        addBranch: async (_, args, global) => {
            try {
                let result = await checkStaff(global)

                if (result?.message || !result) throw new NotFoundError('You can\'t add branch')
                if (!args.branchname.trim() || !args.address.trim() || args.branchname.length <= 2) {
                    throw new UserInputError("The branch name and addres are required! And address name should contain in region of uzbekistan")
                }

                if (!result.toall && !result.add_branch) throw new NotFoundError('You can\'t add branch')
                const branch = await model.addBranch(args)

                return {
                    status: 200,
                    message: "The branch added!",
                    data: branch
                }

            } catch (error) {
                throw error;
            }
        },

        changeBranch: async (_, args, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result) throw new NotFoundError('You can\'t add branch')
                if (!args.branchname.trim() || !args.address.trim() || args.branchname.length <= 2) {
                    throw new UserInputError("The branch name and addres are required! And address name should contain in region of uzbekistan")
                }
                
                const editeableBranches = result.change_branch.split('-')
                
                if (!result.toall && !editeableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t add branch')}

                const branch = await model.changeBranch(args)
                
                if (!branch) {throw new NotFoundError('You can\'t add branch')}

                return {
                    status: 200,
                    message: "The branch edited!",
                    data: branch
                }

            } catch (error) {
                throw error;
            }
        },

        deleteBranch: async (_, args, global) => {
            try {
                let result = await checkStaff(global)
                
                if (result?.message || !result) throw new NotFoundError('You can\'t add branch')
                
                const removableBranches = result.delete_branch.split('-')

                if (!result.toall && !removableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t add branch')}

                const branch = await model.deleteBranch(args)
                
                if (!branch) {throw new NotFoundError('You can\'t add branch')}

                return {
                    status: 200,
                    message: "The branch deleted!",
                    data: branch
                }

            } catch (error) {
                throw error;
            }
        }
    },

    Branch: {
        branchid: global => global.branchid,
        branchname: global => global.branchname,
        addedTime: global => global.branchaddedat,
        address: global => global.branchadress,
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