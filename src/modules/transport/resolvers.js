import { UserInputError } from 'apollo-server-express'
import { NotFoundError } from '#helpers/errors'
import { checkStaff } from '#helpers/checkStaff'
import fs from 'fs'
import path from 'path'
import model from './model.js'
import branchModel from '../branch/model.js'
import queryModel from '../query/model.js'
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
            try {
                let result = await checkStaff(global)
                
                if (result?.message || !result) throw new NotFoundError('You can\'t change transport')
                if (args.model.length <= 2) {throw new UserInputError("The model required")}
                
                let transportInfo = await queryModel.getTransport({ transportid: args.transportId})

                if (!transportInfo) throw new NotFoundError('This transport does not exist')
                if (!result.toall && !result.change_transport.includes(transportInfo.branchid)) throw new NotFoundError('You can\'t change transport')

                const transport = await model.changeTransport(args)
                transport.transportaddedat = transport.transportaddedat.toLocaleString()

                return {
                    status: 200,
                    message: "The transport edited!",
                    data: transport
                }

            } catch (error) {
                throw error
            }
        },

        deleteTransport: async (_, args, global) => {
            try {
                let result = await checkStaff(global)

                if (result?.message || !result) throw new NotFoundError('You can\'t delete transport')
                
                let transportInfo = await queryModel.getTransport({ transportid: args.transportId})

                if (!transportInfo) throw new NotFoundError('This transport does not exist')
                if (!result.toall && !result.delete_transport.includes(transportInfo.branchid)) throw new NotFoundError('You can\'t change transport')

                const transport = await model.deleteTransport(args)
                transport.transportaddedat = transport.transportaddedat.toLocaleString()
                
                return {
                    status: 200,
                    message: "The transport deleted!",
                    data: transport
                }
            } catch (error) {
                throw error
            }
        }
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