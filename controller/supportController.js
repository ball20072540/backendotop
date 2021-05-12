// const bcrypt = require('bcrypt')
const UserDB = require('./dbController/userController')
const LogOwnerDB = require('./dbController/logController')
const STATIC = require('../config/staticData')

function createUser(user, image){
    return new Promise((resolve,reject) => {
        UserDB.getUserByUsername(user.username).then(async findUser => {
            if(findUser){
                reject({success: false, error: 'Forbidden : This username is already taken.'},403) // username มีผู้ใช้แล้ว
            }else{
                // await bcrypt.hash(user.password, 10, async (err, passwordHash) => {
                //     if(err){
                //         console.log(err)
                //         reject({success: false, error: "Bad Request : Password Can't encrypt"},400) // รหัสผ่าน ไม่สามารถเข้ารหัสได้
                //     }else{
                //         let new_user = {
                //             ...user,
                //             password: passwordHash
                //         }
                //         await UserDB.createUser(new_user).then(async resUser => {
                //             let new_log_owner = {
                //                 ownerId: resUser.id,
                //                 approveStatus: STATIC.LOGOWNER.WAITING
                //             }
                //             await LogOwnerDB.createLogOwnerRegister(new_log_owner)
                            
                //             let new_user_image = {
                //                 ...image,
                //                 userId: resUser.id
                //             }
                //             if(image){
                //                 await UserDB.createUserImage(new_user_image)
                //                 // .then(async resUserImage => {
                //                 //     await UserDB.getUserById(resUser.id).then(resGetUser => {
                //                 //         resolve(resGetUser)
                //                 //     }).catch(err => {
                //                 //         console.log(err)
                //                 //         reject({success: false, error: `Internal Server Error : ${err}`},500)
                //                 //     })
                //                 // })
                //             }
                //             // else{
                //             //     await UserDB.getUserById(resUser.id).then(resGetUser => {
                //             //         resolve(resGetUser)
                //             //     }).catch(err => {
                //             //         console.log(err)
                //             //         reject({success: false, error: `Internal Server Error : ${err}`},500)
                //             //     })
                //             // }
                //             resolve(resUser)
                //         })
                //     }
                // }).catch(err => {
                //     console.log(err)
                //     reject({success: false, error: `Internal Server Error : ${err}`},500)
                // })
            }
        })
    })
}

module.exports = {
    createUser
}