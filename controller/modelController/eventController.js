const DB = require('../dbController/eventController')

async function createEvent(req, res){
    const {
        adminId,
        eventName,
        eventDay,
        detail,
        images
    } = req.body

    const new_event = {
        createBy: adminId,
        eventName: eventName,
        details: detail,
        eventDay: eventDay,
    }

    await DB.createEvent(new_event).then(async event => {
        for(let i = 0 ; i < images.length ; i++){
            await DB.createEventImage(event.id, images[i])
        }

        res.json(event)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getAllEvent(req, res) {
    await DB.getEvents().then(events => {
        res.json(events)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function removeEvent(req, res) {
    const {
        id
    } = req.body
    await DB.removeEvent(id).then(status => {
        res.json(status)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function updateEvent(req, res){
    const {
        id,
        adminId,
        eventName,
        eventDay,
        detail,
        images
    } = req.body

    const update_event = {
        id: id,
        createBy: adminId,
        eventName: eventName,
        details: detail,
        eventDay: eventDay,
    }

    await DB.updateEvent(update_event).then(async result => {
        for(let i = 0 ; i < images.length ; i++){
            await DB.createEventImage(update_event.id, images[i])
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

async function removeEventImages(req, res) {
    const {
        images
    } = req.body
    let listImage = []
    images.forEach(img => {
        listImage.push(img.id)
    });
    await DB.removeEventImage(listImage).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

module.exports = {
    createEvent,
    getAllEvent,
    removeEvent,
    removeEventImages,
    updateEvent
}