const db = require('../../config/database');
//const Op = db.Sequelize.Op;

//Table
const Attraction = db.Attraction
const AttractionImage = db.AttractionImage
const AttractionType = db.AttractionType

// Query
function getAttractionType(){
    return new Promise((resolve,reject) => {
        AttractionType.findAll().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getAttractions(){
    return new Promise((resolve,reject) => {
        Attraction.findAll({
            include: [
                {
                    model: AttractionImage
                },
                {
                    model: AttractionType
                }
            ]
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getAttractionById(id){
    return new Promise((resolve,reject) => {
        Attraction.findOne({
            include: [
                {
                    model: AttractionImage
                }
            ],
            where: { id: id }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Create
function createAttraction(attraction){
    return new Promise((resolve,reject) => {
        Attraction.create(attraction).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createAttractionImage(attractionId, image){
    return new Promise((resolve,reject) => {
        let model = {
            attractionId: attractionId,
            imageName: image.imageName,
            url: image.url
        }
        AttractionImage.create(model).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update
function updateAttraction(attraction){
    return new Promise((resolve,reject) => {
        Attraction.update(attraction, {
            where: { id: attraction.id }
        }).then(async num => {
            if(num == 1){
                await getAttractionById(attraction.id).then(result => {
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

// Delete
function removeAttraction(id){
    return new Promise((resolve,reject) => {
        AttractionImage.destroy({
            where: { attractionId: id }
        }).then(status => {
            Attraction.destroy({
                where: { id: id }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
}

function removeImagesAttraction(listId){
    return new Promise((resolve,reject) => {
        AttractionImage.destroy({
            where: { id: listId }
        }).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    }).catch(err => {
        reject(err)
    })
}



module.exports = {
    getAttractionType,
    getAttractions,

    createAttraction,
    createAttractionImage,

    updateAttraction,
    
    removeImagesAttraction,
    removeAttraction
};