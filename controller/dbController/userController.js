const db = require('../../config/database');
//-const Op = db.Sequelize.Op;
const CryptoJS = require('crypto-js')
const STATIC = require('../../config/staticData')

//Table
const User = db.User
const UserRole = db.UserRole
const UserImage = db.UserImage
const LogOwnerRegister = db.LogOwnerRegister

// Query
function getUserByToken(token){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { accessToken: token }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserByUsernameAndShowPassword(username){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { username: username }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserByUsername(username){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { username: username }
        }).then(data => {
            if(data){
                data.password = null
            }    
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserByPhoneNumber(phone){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { phoneNumber: phone }
        }).then(data => {
            if(data){
                data.password = null
            }    
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserByEmail(email){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { email: email }
        }).then(data => {
            if(data){
                data.password = null
            }    
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserById(id){
    return new Promise((resolve,reject) => {
        User.findOne({
            include: [
                { model: UserRole },
                { model: UserImage },
                { model: LogOwnerRegister },
            ],
            where: { id: id }
        }).then(data => {
            if(data){
                data.password = null
            }    
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getUserForChangePassword(id){
    return new Promise((resolve,reject) => {
        User.findOne({
            where: { id: id }
        }).then(data => {
            if(data){
                data.password = null
            }    
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Create
function createUser(user){
    return new Promise((resolve,reject) => {
        User.create(user).then(async res => {
            await getUserById(res.id).then(resUser => {
                resolve(resUser)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
}

function createUserImage(image){
    return new Promise((resolve,reject) => {
        UserImage.create(image).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update
function updateUserToken(user, jwtToken, refreshToken){
    return new Promise((resolve,reject) => {
        let date = new Date(Date.now())
        date.setHours(date.getHours() + STATIC.TIMELOGIN)  //Hours
        let enTime = `${CryptoJS.AES.encrypt(date.getTime()+'', '')}`

        let new_user = {
            accessToken: jwtToken,
            refreshToken: refreshToken,
            lastLogin: enTime
        }
        
        User.update(new_user, {
            where: { id: user.id }
        }).then(async num => {
            if(num == 1){
                await getUserById(user.id).then(user_update => {
                    resolve(user_update)
                })
            }else{
                reject('System error, unable to update information.')
            }
        }).catch(err => {
            reject(err)
        })
    })
}

function changePassword(user){
    return new Promise((resolve,reject) => {
        User.update(user, {
            where: { id: user.id }
        }).then(async num => {
            if(num == 1){
                await getUserById(user.id).then(user_update => {
                    resolve(user_update)
                })
            }else{
                reject('System error, unable to update information.')
            }
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getUserByToken,
    getUserByUsername,
    getUserByUsernameAndShowPassword,
    getUserById,
    getUserByPhoneNumber,
    getUserByEmail,
    getUserForChangePassword,

    createUser,
    createUserImage,

    updateUserToken,
    changePassword
};