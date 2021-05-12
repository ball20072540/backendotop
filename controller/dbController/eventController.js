const db = require('../../config/database');
//const Op = db.Sequelize.Op;

//Table
const Event = db.Event
const EventImage = db.EventImage

// Query
function getEvents(){
    return new Promise((resolve,reject) => {
        Event.findAll({
            include: [
                {
                    model: EventImage
                }
            ]
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getEventById(id){
    return new Promise((resolve,reject) => {
        Event.findOne({
            include: [
                {
                    model: EventImage
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
function createEvent(event){
    return new Promise((resolve,reject) => {
        Event.create(event).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createEventImage(eventId, image){
    return new Promise((resolve,reject) => {
        let model = {
            eventId: eventId,
            imageName: image.imageName,
            url: image.url
        }
        EventImage.create(model).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update
function updateEvent(event){
    return new Promise((resolve,reject) => {
        Event.update(event, {
            where: { id: event.id }
        }).then(async num => {
            if(num == 1){
                await getEventById(event.id).then(result_event => {
                    resolve(result_event)
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
function removeEvent(id){
    return new Promise((resolve,reject) => {
        EventImage.destroy({
            where: {
                eventId: id
            }
        }).then(status => {
            Event.destroy({
                where: {
                    id: id
                }
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

function removeEventImage(listId){
    return new Promise((resolve,reject) => {
        EventImage.destroy({
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
    getEvents,

    createEvent,
    createEventImage,

    updateEvent,

    removeEvent,
    removeEventImage,
};