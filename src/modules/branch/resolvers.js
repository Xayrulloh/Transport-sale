import { UserInputError } from 'apollo-server-express'
import { NotFoundError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
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

                branch.branchaddedat = branch.branchaddedat.toLocaleString()
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
                if (result?.message || !result) throw new NotFoundError('You can\'t change branch')
                if (!args.branchname.trim() || !args.address.trim() || args.branchname.length <= 2) {
                    throw new UserInputError("The branch name and addres are required! And address name should contain in region of uzbekistan")
                }
                
                const editeableBranches = result.change_branch.split('-')
                
                if (!result.toall && !editeableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t change this branch')}

                const branch = await model.changeBranch(args)
                if (!branch) {throw new NotFoundError('This branch does not exist in our database')}

                branch.branchaddedat = branch.branchaddedat.toLocaleString()
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
                
                if (result?.message || !result) throw new NotFoundError('You can\'t delete branch')
                
                const removableBranches = result.delete_branch.split('-')

                if (!result.toall && !removableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t delete branch')}

                const branch = await model.deleteBranch(args)
                
                if (!branch) {throw new NotFoundError('You can\'t delete branch')}

                branch.branchaddedat = branch.branchaddedat.toLocaleString()
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
    }
}