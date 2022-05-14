import { UserInputError } from 'apollo-server-express'
import { NotFoundError } from '#helpers/errors'
import { DatabaseError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
import { PAGINATION_CONFIG } from '#config/index'
import fs from 'fs'
import path from 'path'
import JWT from 'jsonwebtoken'
import model from './model.js'
import branchModel from '../branch/model.js'
import { finished } from 'stream/promises'

export default {
    Mutation: {
        addTransport: async (_, args, global) => {
            try {
                let result = await checkStaff(global)

                let { createReadStream, filename, mimetype, encoding } = await args.img

                if (!['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {throw new UserInputError("You must upload image")}

                const stream = createReadStream()
                const fileName = filename.replace(/\s/g, '')
                const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName));
                stream.pipe(out);
                await finished(out);

                if (result?.message || !result) throw new NotFoundError('You can\'t add transport')
                
                if (args.model.length <= 2) {throw new UserInputError("The model required")}
                
                if (!result.toall && !result.add_transport.includes(args.branchId)) throw new NotFoundError('You can\'t add transort')
                
                let resolve = await branchModel.branches()
                if (!resolve.find(el => el.branchid == args.branchId)) throw new NotFoundError('You can\'t add transport')

                const transport = await model.addTransport({ branchId:args.branchId, model:args.model, color:args.color, img:fileName })

                return {
                    status: 200,
                    message: "The transport added!",
                    data: transport
                }
                
            } catch (error) {
                throw error;
            }
        },
        
        changeTransport: async (_, args, global) => {
            
        }
        // changeBranch: async (_, args, global) => {
        //     try {
        //         let result = await checkStaff(global)
        //         if (result?.message || !result) throw new NotFoundError('You can\'t add branch')
        //         if (!args.branchname.trim() || !args.address.trim() || args.branchname.length <= 2) {
        //             throw new UserInputError("The branch name and addres are required! And address name should contain in region of uzbekistan")
        //         }
        
        //         const editeableBranches = result.change_branch.split('-')
        
        //         if (!result.toall && !editeableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t add branch')}
        
        //         const branch = await model.changeBranch(args)
        
        //         if (!branch) {throw new NotFoundError('You can\'t add branch')}
        
        //         return {
        //             status: 200,
        //             message: "The branch edited!",
        //             data: branch
        //         }
        
        //     } catch (error) {
        //         throw error;
        //     }
        // },
        
        // deleteBranch: async (_, args, global) => {
        //     try {
        //         let result = await checkStaff(global)
        
        //         if (result?.message || !result) throw new NotFoundError('You can\'t add branch')
        
        //         const removableBranches = result.delete_branch.split('-')
        
        //         if (!result.toall && !removableBranches.includes(args.branchId.toString())) {throw new NotFoundError('You can\'t add branch')}
        
        //         const branch = await model.deleteBranch(args)
        
        //         if (!branch) {throw new NotFoundError('You can\'t add branch')}
        
        //         return {
        //             status: 200,
        //             message: "The branch deleted!",
        //             data: branch
        //         }
        
        //     } catch (error) {
        //         throw error;
        //     }
        // }
    },
    
    Transport: {
        transportId: global => global.transportid,
        branchId: global => global.branchid,
        model: global => global.model,
        color: global => global.color,
        img: global => global.img,
        transportAddedAt: global => global.transportaddedat,
    }
}