import { GraphQLUpload } from 'graphql-upload'

export default {
    Upload: GraphQLUpload,
    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    },

    GlobalType: {
        __resolveType: object => {
            if (object.staffname) return 'Staff'
            if (object.branchname) return 'Branch'
            if (object.permissionid) return 'Permission'
            if (object.transportid) return 'Transport'
            return null
        }
    }
}