// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const DB = require('../dbController/userController')
const BusinessDB = require('../dbController/businessController')
const STATIC = require('../../config/staticData')

async function register(req, res){
    const {
        user,
        image
    }= req.body

    await DB.getUserByUsername(user.username).then(async (data) => {
        if(data){
            return res.json({
                success: false,
                error: 'Forbidden : This username is already taken.'  // username มีผู้ใช้แล้ว
            }, 403) // 403 Forbidden : ระบุตัวตนแล้วแต่ไม่มีสิทธิ์เข้าถึงส่วนนี้
        }
        // await bcrypt.hash(user.password, 10, async (err, passwordHash) => {
        //     if(err){
        //         return res.json({
        //             success: false,
        //             error: "Bad Request : Password Can't encrypt" // รหัสผ่าน ไม่สามารถเข้ารหัสได้
        //         }, 400) // 400 : Bad Request ไม่ตอบสนองเพราะมี syntax ไม่ถูกต้อง
        //     }

        //     let new_user = {
        //         ...user,
        //         password: passwordHash
        //     }
            
        //     await DB.createUser(new_user).then(async resUser => {
        //         if(user.role_id !== STATIC.USERROLE.ADMIN && image){
        //             let new_user_image = {
        //                 ...image,
        //                 userId: resUser.id
        //             }
        //             await DB.createUserImage(new_user_image)
        //         }
        //         await DB.getUserById(resUser.id).then(user => {
        //             res.json(user)
        //         }).catch(err => {
        //             console.log(err)
        //             return res.json({
        //                 success: false,
        //                 error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        //             }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
        //         })
        //     }) 
        // })
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    }) 
}

async function login(req, res){
    const {
        username,
        password
    }= req.body
    await DB.getUserByUsernameAndShowPassword(username).then(async (findUser) => {
        let business = null
        if(!findUser){
            return res.json({
                success: false,
                error: "Bad Request : User Not Found" // ไม่พบผู้ใช้
            }, 444)
        }

        if(findUser.role_id === STATIC.USERROLE.RENTAL_OWNER || findUser.role_id === STATIC.USERROLE.SHOP_OWNER){
            if(findUser.log_owner_register.approveStatus === STATIC.LOGOWNER.WAITING){
                return res.json({
                    success: false,
                    error: "Bad Request : User Not Approve" // ผู้ใช้ยังไม่ได้รับการอนุมัติให้เข้าใช้งาน
                }, 403)
            }else if(findUser.log_owner_register.approveStatus === STATIC.LOGOWNER.REJECT){
                return res.json({
                    success: false,
                    error: "Bad Request : User Not Found" // ผู้ใช้ถูกยกเลิกการเข้าใช้งาน
                }, 444)
            }else{
                await BusinessDB.getBusinessByOwnerId(findUser.id).then(res_business => {
                    business = res_business
                }).catch(err => {
                    console.log(err)
                    return res.json({
                        success: false,
                        error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                    }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
                })
            }
        }
        
        // await bcrypt.compare(password, findUser.password, async (err, response) => {
        //     if(err){
        //         return res.json({
        //             success: false,
        //             error: "Bad Request : Password Can't encrypt" // รหัสผ่าน ไม่สามารถเข้ารหัสได้
        //         }, 400) // 400 : Bad Request ไม่ตอบสนองเพราะมี syntax ไม่ถูกต้อง
        //     }
        //     if(response){
        //         const myJwt = req.headers["secret"]
        //         const jwtToken = jwt.sign(`${password}${new Date()}`, myJwt)

        //         await DB.updateUserToken(findUser, jwtToken, findUser.accessToken).then(result => {
        //             if(business){
        //                 let model = JSON.parse(JSON.stringify(result))
        //                 model = {
        //                     ...model,
        //                     business: business
        //                 }
        //                 res.json(model)
        //             }else{
        //                 res.json(result)
        //             }
        //         }).catch(err => {
        //             console.log(err)
        //             return res.json({
        //                 success: false,
        //                 error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        //             }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
        //         })
        //     }else{
        //         return res.json({
        //             success: false,
        //             error: "Bad Request : Your password is wrong." // รหัสผ่าน ไม่สามารถเข้ารหัสได้
        //         }, 400) // 400 : Bad Request ไม่ตอบสนองเพราะมี syntax ไม่ถูกต้อง
        //     }
        // })
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getUserById(req, res){
    const {
        id
    }= req.body
    await DB.getUserById(id).then(async (user) => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getUserByUsername(req, res){
    const {
        username
    }= req.query
    await DB.getUserByUsername(username).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getUserByPhoneNumber(req, res){
    const {
        phone
    }= req.query
    await DB.getUserByPhoneNumber(phone).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getUserByEmail(req, res){
    const {
        email
    }= req.query
    await DB.getUserByEmail(email).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function changePassword(req, res){
    const {
        userId,
        password
    }= req.query
    if(userId && password){
        await DB.getUserForChangePassword(Number(userId)).then(async (user) => {
            // await bcrypt.hash(`${password}`, 10, async (err, passwordHash) => {
            //     if(err){
            //         return res.json({
            //             success: false,
            //             error: "Password Can't encrypt"
            //         }, 500)
            //     }
            //     let update = {
            //         id: user.id,
            //         password: `${passwordHash}`
            //     }
            //     await DB.changePassword(update).then(user_update => {
            //         user_update.password = `${password}`
            //         res.json({
            //             status: true,
            //             message: 'Change password successfully.',
            //             user: user_update
            //         }, 200)
            //     }).catch(err => {
            //         return res.json({
            //             success: false,
            //             error: err
            //         }, 500)
            //     })
            // })
        }).catch(err => {
            return res.json({
                success: false,
                error: 'User not found.'
            }, 404)
        })
    }else{
        return res.json({
            success: false,
            error: 'Parameter not found.'
        }, 404)
    }
}


module.exports = {
    register,
    login,
    getUserById,
    getUserByUsername,
    getUserByPhoneNumber,
    getUserByEmail,
    changePassword
}