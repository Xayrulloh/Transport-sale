import { UserInputError } from 'apollo-server-express'
import JWT from 'jsonwebtoken'
import model from './model.js'

export default {
    Mutation: {
        register: async (_, args, global) => {
            if (!args.staffname.trim() || !args.password.trim() || args.staffname.length <= 2 || args.password.length <= 3 || args.password != args.repeat_password) {
                throw new UserInputError("The staffname and password are required!")
            }

            const staff = await model.addStaff(args)
            await model.addPermission(staff)
            
            let token = JWT.sign({token: staff.staffid, userAgent:global.userAgent}, process.env.JWT_SECRET_KEY, {expiresIn: '5h'});
            staff.birthdate = staff.birthdate.toLocaleString()

            return {
                status: 200,
                message: "The staff added!",
                token: token,
                data: staff
            }
        },

        login: async (_, args, global) => {
            if (!args.staffname.trim() || !args.password.trim() || args.staffname.length <= 2 || args.password.length <= 3 || args.password != args.repeat_password) {
                throw new UserInputError("The staffname and password are required!")
            }

            const staff = await model.login(args)

            if (!staff) throw new UserInputError('You are not our staff. First register')

            let token = JWT.sign({token: staff.staffid, userAgent:global.userAgent}, process.env.JWT_SECRET_KEY, {expiresIn: '5h'});

            staff.birthdate = staff.birthdate.toLocaleString()

            return {
                status: 200,
                message: "The staff logged in!",
                token: token,
                data: staff
            }
        }
    },
    Staff: {
        staffId: global => global.staffid,
        staffname: global => global.staffname,
        password: global => global.password,
        branchId: global => global.branchid,
        birthdate: global => global.birthdate,
        gender: global => global.gender
    }
}