const DB = require('../dbController/roomController')
const STATIC = require('../../config/staticData')

async function getRoomType(req, res){
    await DB.getRoomType().then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getRoomsByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getRoomsByBusinessId(id).then(async rooms => {
        let listRoom = []
        if(rooms.length == 0){
            return res.json(listRoom)
        }
        await rooms.forEach(async (r, i) => {
            await DB.getBookingCheckInByRoomId(r.id).then(res_booking => {
                listRoom.push(
                    {
                        room: r,
                        user: res_booking ? res_booking.user : res_booking
                    }
                )
                if((i+1) == rooms.length){
                    return res.json(listRoom)
                }
            })
        })
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getRoomById(req, res){
    const {
        id
    } = req.body
    await DB.getRoomById(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function viewRooms(req, res){
    const {
        id
    } = req.body
    await DB.viewRooms(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getBookingByCustomerId(req, res){
    const {
        id
    } = req.body
    await DB.getBookingByCustomerId(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getDateBooking(req, res){
    const {
        id
    } = req.body
    await DB.getDateBooking(id).then(result => {
        let listDate = []
        result.forEach(d => {
            listDate.push({start: d.startDate, end: d.endDate})
            // for (let i = 0; i < d.sizeDate; i++) {
            //     let date = new Date(d.startDate)
            //     date.setDate(date.getDate() + i)
            //     listDate.push(date)
            // }
        })
        return res.json(listDate)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getNewBookingByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getNewBookingByBusinessId(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getAllBookingByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getAllBookingByBusinessId(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getSizeNewBooking(req, res){
    const {
        id
    } = req.body
    await DB.getSizeNewBooking(id).then(result => {
        return res.json(result.length)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}


//Create
async function createRoom(req, res){  
    const {
        room,
        images
    } = req.body
    let newRoom = {
        ...room,
        statusId: STATIC.ROOMSTATUS.BLANK_ROOM
    }
    await DB.createRoom(newRoom).then(async res_room => {
        for(let i = 0 ; i < images.length ; i++){
            let img = {
                ...images[i],
                roomId: res_room.id
            }
            await DB.createRoomImage(img)
        }
        await DB.getRoomById(res_room.id).then(room_res => {
            return res.json(room_res)
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
}

async function createBooking(req, res){  
    const {
        booking
    } = req.body
    let newBooking = {
        ...booking,
        statusId: STATIC.BOOKINGSTATUS.NEW_BOOKING,
        created: new Date()
    }
    await DB.createBooking(newBooking).then(async res_booking => {
        let new_room = {
            statusId: STATIC.ROOMSTATUS.IS_BOOKING
        }
        await DB.updateRoom(res_booking.roomId, new_room).then(res_room => {
            return res.json(res_booking)
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
}

//Update
async function updateStatusOnline(req, res){  
    const {
        id,
        active
    } = req.body
    let new_odject = {
        active: active,
    }
    await DB.updateRoom(id, new_odject).then(res_update => {
        return res.json(res_update)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function editRoom(req, res){  
    const {
        id,
        room,
        images
    } = req.body
    let new_room = {
        ...room,
        updated: new Date()
    }
    await DB.updateRoom(id, new_room).then(async res_room => {
        if(images.length > 0){
            for(let i = 0 ; i < images.length ; i++){
                let img = {
                    ...images[i],
                    roomId: id
                }
                await DB.createRoomImage(img)
            }
        }
        await DB.getRoomById(id).then(room_res => {
            return res.json(room_res)
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
}

async function cancelBookingByCustomer(req, res){  
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.BOOKINGSTATUS.CANCEL_BY_CUSTOMER,
    }
    await DB.getBookingById(id).then(async res_booking => {
        if(res_booking.statusId !== STATIC.BOOKINGSTATUS.NEW_BOOKING){
            return res.json({
                success: false,
                error: 'Not a new booking' // Error Status Booking ไม่ใช่รายการของใหม่
            }, 200)
        }else{
            await DB.updateBooking(id, new_odject).then(async res_cancel => {
                await DB.getRoomByBookingId(id).then(async res_room => {
                    await DB.getBookingActiveByRoomId(res_room.id).then(async check_room => {
                        if(check_room.length > 0){
                            return res.json(res_cancel)
                        }else{
                            // return res.json(res_room)
                            if(res_room.statusId == STATIC.ROOMSTATUS.BLANK_ROOM){
                                return res.json(res_cancel)
                            }else{
                                let new_room = {
                                    statusId: STATIC.ROOMSTATUS.BLANK_ROOM
                                }
                                await DB.updateRoom(res_room.id, new_room).then(res_blank_room => {
                                    return res.json(res_cancel)
                                }).catch(err => {
                                    console.log(err)
                                    return res.json({
                                        success: false,
                                        error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                                    }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
                                })
                            }
                        }
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
            }).catch(err => {
                console.log(err)
                return res.json({
                    success: false,
                    error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
            })
        }
    })
    
}

async function cancelBookingByOwner(req, res){  
    const {
        id,
        comment
    } = req.body
    let new_odject = {
        statusId: STATIC.BOOKINGSTATUS.CANCEL_BY_OWNER,
        comment: comment
    }
    await DB.getBookingById(id).then(async res_booking => {
        if(res_booking.statusId == STATIC.BOOKINGSTATUS.CANCEL_BY_CUSTOMER){
            return res.json({
                success: false,
                error: 'Customer cancel' // Error ลูกค้ายกเลิกก่อนแล้ว
            }, 200)
        }else{
            await DB.updateBooking(id, new_odject).then(async res_cancel => {
                await DB.getRoomByBookingId(id).then(async res_room => {
                    await DB.getBookingActiveByRoomId(res_room.id).then(async check_room => {
                        if(check_room.length > 0){
                            return res.json(res_cancel)
                        }else{
                            if(res_room.statusId == STATIC.ROOMSTATUS.BLANK_ROOM){
                                return res.json(res_cancel)
                            }else{
                                let new_room = {
                                    statusId: STATIC.ROOMSTATUS.BLANK_ROOM
                                }
                                await DB.updateRoom(res_room.id, new_room).then(res_blank_room => {
                                    return res.json(res_cancel)
                                }).catch(err => {
                                    console.log(err)
                                    return res.json({
                                        success: false,
                                        error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                                    }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
                                })
                            }
                        }
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
            }).catch(err => {
                console.log(err)
                return res.json({
                    success: false,
                    error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
            })
        }
    })
}

async function approveBooking(req, res){  
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.BOOKINGSTATUS.WAITING_CHECK_IN,
    }
    await DB.getBookingById(id).then(async res_booking => {
        if(res_booking.statusId == STATIC.BOOKINGSTATUS.CANCEL_BY_CUSTOMER){
            return res.json({
                success: false,
                error: 'Customer cancel' // Error ลูกค้ายกเลิกก่อนแล้ว
            }, 200)
        }else{
            await DB.updateBooking(id, new_odject).then(res_cancel => {
                return res.json(res_cancel)
            }).catch(err => {
                console.log(err)
                return res.json({
                    success: false,
                    error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
            })
        }
    })
    
}

async function checkIn(req, res){  
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.BOOKINGSTATUS.CHECK_IN,
    }

    await DB.getBookingById(id).then(async res_booking => {
        let nowDate = new Date()
        let startDate = new Date(res_booking.startDate)
        let endDate = new Date(res_booking.endDate)
        if(startDate <= nowDate && nowDate <= endDate){
            await DB.updateBooking(id, new_odject).then(async res_checkIn => {
                await DB.getRoomByBookingId(id).then(async res_room => {
                    let new_room = {
                        statusId: STATIC.ROOMSTATUS.BUSY_ROOM
                    }
                    await DB.updateRoom(res_room.id, new_room).then(res_room => {
                        return res.json(res_checkIn)
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
            }).catch(err => {
                console.log(err)
                return res.json({
                    success: false,
                    error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
                }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
            })
        }else{
            return res.json({
                success: false,
                error: 'Time is not right' // Error Check in นอกเหนือช่วงเวลาที่จอง
            }, 200)
        }
    })
}

async function checkOut(req, res){  
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.BOOKINGSTATUS.CHECK_OUT,
    }
    await DB.updateBooking(id, new_odject).then(async res_checkOut => {
        await DB.getRoomByBookingId(id).then(async res_room => {
            await DB.getBookingActiveByRoomId(res_room.id).then(async check_room => {
                let new_room = null
                if(check_room.length > 0){
                    new_room = {
                        statusId: STATIC.ROOMSTATUS.IS_BOOKING
                    }
                }else{
                    new_room = {
                        statusId: STATIC.ROOMSTATUS.BLANK_ROOM
                    }
                }
                await DB.updateRoom(res_room.id, new_room).then(res_blank_room => {
                    return res.json(res_checkOut)
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
}

//Delete
async function removeRoomImages(req, res) {
    const {
        images
    } = req.body
    let listImage = []
    images.forEach(img => {
        listImage.push(img.id)
    });
    await DB.removeRoomImages(listImage).then(result => {
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
    getRoomType,
    getRoomsByBusinessId,
    getRoomById,
    getBookingByCustomerId,
    getDateBooking,
    getNewBookingByBusinessId,
    getAllBookingByBusinessId,
    getSizeNewBooking,
    viewRooms,
    createRoom,
    createBooking,
    updateStatusOnline,
    cancelBookingByCustomer,
    cancelBookingByOwner,
    editRoom,
    removeRoomImages,
    approveBooking,
    checkIn,
    checkOut
}