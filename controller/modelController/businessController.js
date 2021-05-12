const DB = require('../dbController/businessController')
const support = require('../supportController')

async function getBusinessById(req, res){
    const {
        id
    } = req.query
    await DB.getBusinessById(id).then(async resBusiness => {
        return res.json(resBusiness)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getBusinessDetailByOwnerId(req, res){
    const {
        id
    } = req.body
    await DB.getBusinessDetailByOwnerId(id).then(resBusiness => {
        return res.json(resBusiness)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getRentals(req, res){
    await DB.getRentals().then(async res_rental => {
        let result = []
        res_rental.forEach(data => {
            if(data.user){
                result.push(data)
            }
        });
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function createBusiness(req, res){
    const {
        owner,
        business,
    } = req.body
    
    await support.createUser(owner.user, owner.image).then(async resUser => {
        let new_business = {
            ...business.info,
            userOwner: resUser.id
        }
        await DB.createBusiness(new_business).then(async resBusiness => {
            let new_business_logo = {
                ...business.logo,
                businessId: resBusiness.id
            }
            let new_business_license = {
                ...business.license,
                businessId: resBusiness.id
            }
            
            await DB.createBusinessLogo(new_business_logo)
            await DB.createBusinessLicense(new_business_license)
            if(business.images){
                if(business.images.length > 0){
                    for(let i = 0 ; i < business.images.length ; i++){
                        let new_img = {
                            ...business.images[i],
                            businessId: resBusiness.id
                        }
                        await DB.createBusinessImage(new_img)
                    }   
                }
            }
            await DB.getBusinessById(resBusiness.id).then(resQuery => {
                return res.json(resQuery)
            }).catch(err => {
                console.log(err)
                return res.json({
                    success: false,
                    error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
            })
        }).catch(err => {
            console.log(err)
            return res.json({
                success: false,
                error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
            }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
        })
        //return res.json(resUser)
    }).catch(err => {
        return res.json(err)
    })
}

module.exports = {
    getBusinessById,
    getBusinessDetailByOwnerId,
    getRentals,

    createBusiness
}