const db = require('../../config/database');
const STATIC = require('../../config/staticData')

const Business = db.Business
const BusinessImage = db.BusinessImage
const BusinessLicense = db.BusinessLicense
const BusinessLogo = db.BusinessLogo
const BusinessType = db.BusinessType
const User = db.User
const UserRole = db.UserRole
const UserImage = db.UserImage
const LogOwnerRegister = db.LogOwnerRegister

// Query
function getBusinessById(id){
    return new Promise((resolve,reject) => {
        Business.findOne({
            include: [
                { model: BusinessType },
                { model: BusinessLogo },
                { model: BusinessLicense },
                { model: BusinessImage },
                { 
                    model: User,
                    include: [
                        { model: UserRole },
                        { model: UserImage },
                        { model: LogOwnerRegister },
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

function getBusinessByOwnerId(id){
    return new Promise((resolve,reject) => {
        Business.findOne({
            where: { userOwner: id }
        }).then(data => {
            let model = {
                id: data.id,
                typeId: data.typeId,
                userOwner: data.userOwner
            }
            resolve(model)
        }).catch(err => {
            reject(err)
        })
    })
}

function getBusinessDetailByOwnerId(id){
    return new Promise((resolve,reject) => {
        Business.findOne({
            include: [
                { model: BusinessType },
                { model: BusinessLogo },
                { model: BusinessLicense },
                { model: BusinessImage },
                { 
                    model: User,
                    include: [
                        { model: UserRole },
                        { model: UserImage },
                        { model: LogOwnerRegister },
                    ]
                }
            ],
            where: { userOwner: id }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getRentals(){
    return new Promise((resolve,reject) => {
        Business.findAll({
            include: [
                { model: BusinessType },
                { model: BusinessLogo },
                { model: BusinessLicense },
                { model: BusinessImage },
                { 
                    model: User,
                    include: [
                        { model: UserRole },
                        { model: UserImage },
                        {
                            model: LogOwnerRegister,
                            where: { approveStatus: STATIC.LOGOWNER.APPROVE}
                        },
                    ]
                }
            ],
            where: { typeId: STATIC.BUSINESSTYPE.RENTAL }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Create
function createBusiness(business){
    return new Promise((resolve,reject) => {
        Business.create(business).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

function createBusinessLogo(businessLogo){
    return new Promise((resolve,reject) => {
        BusinessLogo.create(businessLogo).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

function createBusinessLicense(businessLicense){
    return new Promise((resolve,reject) => {
        BusinessLicense.create(businessLicense).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

function createBusinessImage(businessImage){
    return new Promise((resolve,reject) => {
        BusinessImage.create(businessImage).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getBusinessById,
    getBusinessByOwnerId,
    getBusinessDetailByOwnerId,
    getRentals,

    createBusiness,
    createBusinessLogo,
    createBusinessLicense,
    createBusinessImage
};