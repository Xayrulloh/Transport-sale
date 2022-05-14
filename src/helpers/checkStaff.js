import JWT from 'jsonwebtoken'
import model from '../modules/branch/model.js'

export async function checkStaff(global) {
    try {
        let {token, userAgent} =  JWT.verify(global.token, process.env.JWT_SECRET_KEY)

        if (!global?.token || userAgent != global.userAgent) throw new Error
        const permission = await model.ownPermission(token)
        return permission
    } catch (error) {
        return error
    }
}



