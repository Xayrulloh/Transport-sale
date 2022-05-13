import { makeExecutableSchema } from '@graphql-tools/schema'

import AuthModule from './auth/index.js'
import BranchModule from './branch/index.js'
import TypesModule from './types/index.js'
import TransportModule from './transport/index.js'
import PermissionModule from './permission/index.js'
import QueryModule from './query/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypesModule.typeDefs,
        AuthModule.typeDefs,
        BranchModule.typeDefs,
        TransportModule.typeDefs,
        PermissionModule.typeDefs,
        QueryModule.typeDefs,
    ],
    resolvers: [
        TypesModule.resolvers,
        AuthModule.resolvers,
        BranchModule.resolvers,
        TransportModule.resolvers,
        PermissionModule.resolvers,
        QueryModule.resolvers,
    ]
})