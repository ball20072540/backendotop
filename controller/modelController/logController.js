const DB = require('../dbController/logController')

async function getSizeLogOwner(req, res){
    const {
        status,
        type
    } = req.query
    await DB.getLogByTypeAndStatus(Number(type), status).then(result => {
        return res.json(result.length)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getLogOwnerRegisterByType(req, res){
    const {
        status,
        type
    } = req.query
    await DB.getLogByTypeAndStatus(Number(type), status).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getLogOwnerRegisterById(req, res){
    const {
        id
    } = req.query
    await DB.getLogOwnerRegisterById(Number(id)).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

// Update
async function updateLogOwnerRegister(req, res){
    const {
        id,
        status
    } = req.body
    let new_log = {
        id: id,
        approveStatus: status
    }
    await DB.updateLogOwnerRegister(new_log).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

module.exports = {
    getSizeLogOwner,
    getLogOwnerRegisterByType,
    getLogOwnerRegisterById,
    updateLogOwnerRegister
}