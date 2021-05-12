const db = require('../../config/database');

//Table
const LogOwnerRegister = db.LogOwnerRegister
const User = db.User
const UserImage = db.UserImage
const Business = db.Business
const BusinessLogo = db.BusinessLogo
const BusinessImage = db.BusinessImage
const BusinessLicense = db.BusinessLicense

// Query
function getLogByTypeAndStatus(type, status){
    return new Promise((resolve,reject) => {
        LogOwnerRegister.findAll({
            include: [
                {
                    model: User,
                    include: [
                        {
                            model: Business,
                            include: [
                                {
                                    model: BusinessLogo,
                                }
                            ]
                        }
                    ]
                }
            ],
            where: { approveStatus: status }
        }).then(data => {
            data.map(log => {
                log.user.password = null
            })
            let result = data.filter(log => {
                return log.user.businesses[0].typeId === type
            })
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function getLogOwnerRegisterById(id){
    return new Promise((resolve,reject) => {
        LogOwnerRegister.findOne({
            include: [
                {
                    model: User,
                    include: [
                        { model: UserImage },
                        {
                            model: Business,
                            include: [
                                { model: BusinessLogo },
                                { model: BusinessImage },
                                { model: BusinessLicense }
                            ]
                        }
                    ]
                }
            ],
            where: { id: id }
        }).then(data => {
            if(data){
                data.user.password = null
            }
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Create
function createLogOwnerRegister(log){
    return new Promise((resolve,reject) => {
        LogOwnerRegister.create(log).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update
function updateLogOwnerRegister(log){
    return new Promise((resolve,reject) => {
        LogOwnerRegister.update(log, {
            where: { id: log.id }
        }).then(async num => {
            if(num == 1){
                await getLogOwnerRegisterById(log.id).then(result => {
                    resolve(result)
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
    createLogOwnerRegister,
    getLogByTypeAndStatus,
    getLogOwnerRegisterById,
    updateLogOwnerRegister
}