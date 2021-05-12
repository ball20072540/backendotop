const db = require('../../config/database');

//Table
const DeliveryService = db.DeliveryService
const Packaging = db.Packaging

//Query
function getDeliveryService(){
    return new Promise((resolve,reject) => {
        DeliveryService.findAll().then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getDeliveryPackaging(id){
    return new Promise((resolve,reject) => {
        Packaging.findAll({
            where: { deliveryBy: id }
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    getDeliveryService,
    getDeliveryPackaging
}