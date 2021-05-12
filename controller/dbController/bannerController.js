const db = require('../../config/database');

//Table
const Banner = db.Banner

// Query
function getBanner(key){
    return new Promise((resolve,reject) => {
        Banner.findOne({
            where: { bannerKey: key }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getBanner
}