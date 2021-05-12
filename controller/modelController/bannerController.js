const DB = require('../dbController/bannerController')

async function getBanner(req, res){
    const {
        key,
    } = req.query
    await DB.getBanner(key).then(result => {
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
    getBanner
}