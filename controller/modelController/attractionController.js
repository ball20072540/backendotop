const DB = require('../dbController/attractionController')

async function getAttractionType(req, res) {
    await DB.getAttractionType().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function createAttraction(req, res){
    const {
        adminId,
        type,
        name,
        logo,
        openDay,
        timeOpen,
        detail,
        images
    } = req.body

    const new_attraction = {
        createBy: adminId,
        typeId: type,
        attractionName: name,
        attractionLogo: logo,
        details: detail,
        openDay: openDay,
        timeOpen: timeOpen
    }

    await DB.createAttraction(new_attraction).then(async attraction => {
        for(let i = 0 ; i < images.length ; i++){
            await DB.createAttractionImage(attraction.id, images[i])
        }

        res.json(attraction)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getAllAttraction(req, res) {
    await DB.getAttractions().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function removeImagesAttraction(req, res) {
    const {
        images
    } = req.body
    let listImage = []
    images.forEach(img => {
        listImage.push(img.id)
    });
    await DB.removeImagesAttraction(listImage).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function removeAttraction(req, res) {
    const {
        id
    } = req.body
    await DB.removeAttraction(id).then(status => {
        res.json(status)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function updateAttraction(req, res){
    const {
        id,
        adminId,
        type,
        name,
        openDay,
        timeOpen,
        detail,
        images,
        logo
    } = req.body

    let update_attraction = {
        id: id,
        createBy: adminId,
        typeId: type,
        attractionName: name,
        details: detail,
        openDay: openDay,
        timeOpen: timeOpen
    }

    if(logo){
        update_attraction = {
            ...update_attraction,
            attractionLogo: logo
        }
    }

    await DB.updateAttraction(update_attraction).then(async result => {
        for(let i = 0 ; i < images.length ; i++){
            await DB.createAttractionImage(update_attraction.id, images[i])
        }   
        res.json(result)
    }).catch(err => {
        console.log(err)
        if(err.includes('unable to update information')){
            res.json(200)
        }
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

module.exports = {
    getAttractionType,
    createAttraction,
    getAllAttraction,
    removeImagesAttraction,
    removeAttraction,
    updateAttraction
}