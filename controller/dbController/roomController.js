const db = require('../../config/database');
const STATIC = require('../../config/staticData')

//Table
const Room = db.Room
const RoomStatus = db.RoomStatus
const RoomType = db.RoomType
const RoomImage = db.RoomImage
const Business = db.Business
const BusinessImage = db.BusinessImage
const BusinessLogo = db.BusinessLogo
const User = db.User

const Booking = db.Booking
const BookingStatus = db.BookingStatus

// Query
function getRoomType(){
    return new Promise((resolve,reject) => {
        RoomType.findAll().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getRoomById(id){
    return new Promise((resolve,reject) => {
        Room.findOne({
            include: [
                { model: RoomStatus },
                { model: RoomType },
                { model: RoomImage },
            ],
            where: { id: id }
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getRoomByBookingId(id){
    return new Promise((resolve,reject) => {
        Booking.findOne({
            include: [{ model: Room, }],
            where: { id: id },
        }).then(data => { 
            resolve(data.room)
        }).catch(err => {
            reject(err)
        })
    })
}

function getRoomsByBusinessId(id){
    return new Promise((resolve,reject) => {
        Room.findAll({
            include: [
                { model: RoomStatus },
                { model: RoomType },
                { model: RoomImage },
                {
                    model: Business,
                    include: [
                        { model: BusinessImage },
                        { model: BusinessLogo },
                        { model: User },
                    ]
                }
            ],
            where: {
                businessId: id
            },
            order: [
                ['statusId', 'DESC'],
                ['active', 'DESC' ]
            ],
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function viewRooms(id){
    return new Promise((resolve,reject) => {
        Room.findAll({
            include: [
                { model: RoomStatus },
                { model: RoomType },
                { model: RoomImage },
                {
                    model: Business,
                    include: [
                        { model: BusinessImage },
                        { model: BusinessLogo },
                        { model: User },
                    ]
                }
            ],
            where: {
                businessId: id,
                active: true
            },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getBookingById(id){
    return new Promise((resolve,reject) => {
        Booking.findOne({
            where: { id: id },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getBookingByCustomerId(id){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [
                { model: BookingStatus },
                {
                    model: Room,
                    include: [
                        {
                            model: Business,
                            include: [
                                { model: BusinessImage },
                                { model: BusinessLogo },
                                { model: User },
                            ]
                        }
                    ]
                }
            ],
            where: { userId: id },
            order: [
                ['statusId', 'ASC']
            ],
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getDateBooking(id){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [ { model: BookingStatus } ],
            where: {
                roomId: id,
                statusId: [
                    STATIC.BOOKINGSTATUS.NEW_BOOKING,
                    STATIC.BOOKINGSTATUS.WAITING_CHECK_IN,
                    STATIC.BOOKINGSTATUS.CHECK_IN
                ]
            },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getNewBookingByBusinessId(id){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [
                { model: BookingStatus },
                { model: User },
                {
                    model: Room,
                    include: [
                        {
                            model: Business,
                            include: [
                                { model: BusinessImage },
                                { model: BusinessLogo },
                                { model: User },
                            ]
                        }
                    ],
                    where: { businessId: id },
                }
            ],
            where: {
                statusId: [
                    STATIC.BOOKINGSTATUS.NEW_BOOKING
                ]
            },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getAllBookingByBusinessId(id){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [
                { model: BookingStatus },
                { model: User },
                {
                    model: Room,
                    include: [
                        {
                            model: Business,
                            include: [
                                { model: BusinessImage },
                                { model: BusinessLogo },
                                { model: User },
                            ]
                        }
                    ],
                    where: { businessId: id },
                }
            ],
            order: [
                ['statusId', 'ASC']
            ],
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getSizeNewBooking(id){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [
                {
                    model: Room,
                    where: { businessId: id },
                }
            ],
            where: {
                statusId: [
                    STATIC.BOOKINGSTATUS.NEW_BOOKING
                ]
            },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getBookingActiveByRoomId(roomId){
    return new Promise((resolve,reject) => {
        Booking.findAll({
            include: [
                {
                    model: Room,
                    where: {id: roomId}
                }
            ],
            where: {
                statusId: [
                    STATIC.BOOKINGSTATUS.NEW_BOOKING,
                    STATIC.BOOKINGSTATUS.WAITING_CHECK_IN,
                    STATIC.BOOKINGSTATUS.CHECK_IN
                ]
            },
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getBookingCheckInByRoomId(roomId){
    return new Promise((resolve,reject) => {
        Booking.findOne({
            include: [
                { model: User },
                {
                    model: Room,
                    where: {id: roomId}
                }
            ],
            where: {
                statusId: STATIC.BOOKINGSTATUS.CHECK_IN
            },
        }).then(data => {
            if(data){
                data.user.accessToken = null
                data.user.lastLogin = null
                data.user.password = null
                data.user.refreshToken = null
                data.user.username = null
            }
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}


//Create
function createRoom(room){
    return new Promise((resolve,reject) => {
        room = {
            ...room,
            updated: new Date()
        }
        Room.create(room).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createRoomImage(img){
    return new Promise((resolve,reject) => {
        RoomImage.create(img).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createBooking(booking){
    return new Promise((resolve,reject) => {
        Booking.create(booking).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

//Update
function updateRoom(id, data){
    return new Promise((resolve,reject) => {
        Room.update(data, {
            where: { id: id }
        }).then(async num => {
            if(num == 1){
                resolve(true)
            }else{
                reject('System error, unable to update information.')
            }
        }).catch(err => {
            reject(err)
        })
    })
}

function updateBooking(id, data){
    return new Promise((resolve,reject) => {
        Booking.update(data, {
            where: { id: id }
        }).then(async num => {
            if(num == 1){
                resolve(true)
            }else{
                reject('System error, unable to update information.')
            }
        }).catch(err => {
            reject(err)
        })
    })
}

//Delete
function removeRoomImages(listId){
    return new Promise((resolve,reject) => {
        RoomImage.destroy({
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
    getRoomType,
    getRoomById,
    getRoomsByBusinessId,
    getRoomByBookingId,
    getBookingById,
    getBookingByCustomerId,
    getDateBooking,
    getNewBookingByBusinessId,
    getAllBookingByBusinessId,
    getSizeNewBooking,
    getBookingActiveByRoomId,
    getBookingCheckInByRoomId,
    viewRooms,
    createRoom,
    createRoomImage,
    createBooking,

    updateRoom,
    updateBooking,

    removeRoomImages,
}