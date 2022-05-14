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

                if (result.toall || result.read_stuff) {
                    let answer = await model.getStaffs({
                        page: pagination?.page || PAGINATION_CONFIG.PAGINATION.PAGE,
                        limit: pagination?.limit || PAGINATION_CONFIG.PAGINATION.LIMIT,
                        sortValue: sort ? sort[sortKey] : null,
                        sortKey,
                        search,
                    })

                    return answer
                } else {
                    let answer = await model.getStaff(result)
                    for (let el of answer) el.birthdate = el.birthdate.toLocaleString()
                    return answer
                } 
                throw new NotFoundError('You can\'t see staffs')

            } catch (error) {
                throw error
            }
        },

        branches: async (_, { pagination, search, sort }, global) => {
            try {
                let result = await checkStaff(global)
                const sortKey = Object.keys(sort || {})[0]
                
                if (result?.message || !result || (!result.toall && !result.read_branch)) {throw new NotFoundError('You can\'t see branches')}

                let answer = await model.getBranches({
                    page: pagination?.page || PAGINATION_CONFIG.PAGINATION.PAGE,
                    limit: pagination?.limit || PAGINATION_CONFIG.PAGINATION.LIMIT,
                    sortValue: sort ? sort[sortKey] : null,
                    sortKey,
                    search,
                })

                for (let el of answer) el.branchaddedat = el.branchaddedat.toLocaleString()
                
                return answer;

            } catch (error) {
                throw error
            }
        },

        permissions: async (_, __, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result || (!result.toall && !result.read_permission)) {throw new NotFoundError('You can\'t see permissions')}
                
                return await model.getPermissions()

            } catch (error) {
                throw error
            }
        },

        permission: async (_, __, global) => {
            try {
                let result = await checkStaff(global)
                if (result?.message || !result) {throw new NotFoundError('You can\'t see permission')}

                return result

            } catch (error) {
                throw error
            }
        },
    }
}