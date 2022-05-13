import { NotFoundError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
import { PAGINATION_CONFIG } from '#config/index'
import model from './model.js'

export default {
    Query: {
        transports: async (_, { pagination, search, sort }, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result || (!result.toall && !result.read_transport)) {throw new NotFoundError('You can\'t see transports')}
                const sortKey = Object.keys(sort || {})[0]

                return await model.getTransports({
                    page: pagination?.page || PAGINATION_CONFIG.PAGINATION.PAGE,
                    limit: pagination?.limit || PAGINATION_CONFIG.PAGINATION.LIMIT,
                    sortValue: sort ? sort[sortKey] : null,
                    sortKey,
                    search,
                })
            } catch (error) {
                throw error
            }
        },
        
        transport: async (_, args, global) => {
            let result = await checkStaff(global)
            if (result?.message || !result || (!result.toall && !result.read_transport)) {throw new NotFoundError('You can\'t see transports')}

            return await model.getTransport(args)
        },

        staffs: async (_, { pagination, search, sort }, global) => {
            try {
                let result = await checkStaff(global)
                const sortKey = Object.keys(sort || {})[0]
                if (result?.message || !result) {throw new NotFoundError('You can\'t see staffs')}

                if (result.toall) {
                    return await model.getStaffs({
                        page: pagination?.page || PAGINATION_CONFIG.PAGINATION.PAGE,
                        limit: pagination?.limit || PAGINATION_CONFIG.PAGINATION.LIMIT,
                        sortValue: sort ? sort[sortKey] : null,
                        sortKey,
                        search,
                    })
                } else if (result.read_stuff) {
                    return await model.getStaff(result)
                } 
                throw new NotFoundError('You can\'t see staffs')

            } catch (error) {
                throw error
            }
        },

        branches: async (_, __, global) => {
            try {
                let result = await checkStaff(global)
                const sortKey = Object.keys(sort || {})[0]
                
                if (result?.message || !result || (!result.toall && !result.read_branch)) {throw new NotFoundError('You can\'t see branches')}

                return await model.getBranches({
                    page: pagination?.page || PAGINATION_CONFIG.PAGINATION.PAGE,
                    limit: pagination?.limit || PAGINATION_CONFIG.PAGINATION.LIMIT,
                    sortValue: sort ? sort[sortKey] : null,
                    sortKey,
                    search,
                })
            } catch (error) {
                throw error
            }
        },

        permissions: async (_, __, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result || (!result.toall && !result.read_permission)) {throw new NotFoundError('You can\'t see branches')}

                return await model.getPermissions()

            } catch (error) {
                throw error
            }
        },

        permission: async (_, __, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result || (!result.toall && !result.read_permission)) {throw new NotFoundError('You can\'t see branches')}

                return result

            } catch (error) {
                throw error
            }
        },
    }
}