const DB = require('../dbController/orderController')
const STATIC = require('../../config/staticData')

async function createOrder(req, res){
    const {
        orders
    } = req.body
    const date = new Date()
    const orderCode = `C${orders[0].customerId}T${date.getTime()}`
    for(let i = 0 ; i < orders.length ; i++){
        let new_order = {
            ...orders[i],
            orderCode: orderCode,
            statusId: STATIC.ORDER_STATUS.NEW_ORDER,
            created: date
        }
        await DB.createOrder(new_order).then(async resOrder => {
            for(let j = 0 ; j < orders[i].orderDetail.length ; j++){
                let new_detail = {
                    ...orders[i].orderDetail[j],
                    orderId: resOrder.id,
                    beforeDeliveryPrice: orders[i].orderDetail[j].deliveryPrice
                }
                await DB.createOrderDetail(new_detail).then(async resDetail => {
                    if((i+1) == orders.length && (j+1) == orders[i].orderDetail.length){
                        return res.json(true)
                    }
                })
            }
        }).catch(err => {
            console.log(err)
            return res.json({
                success: false,
                error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
            }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
        })
    }
}

async function getSizeMyOrderByCustomerId(req, res){
    const {
        id
    } = req.body
    await DB.getOrderByCustomerAndStatus(id, STATIC.ORDER_STATUS.NEW_ORDER).then(result => {
        return res.json(result.length)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getMyOrders(req, res){
    const {
        id
    } = req.body
    await DB.getMyOrders(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getSizeNewOrderByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getOrderByBusinessIdAndStatus(id, STATIC.ORDER_STATUS.NEW_ORDER).then(result => {
        return res.json(result.length)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getNewOrderByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getOrderByBusinessIdAndStatus(id, STATIC.ORDER_STATUS.NEW_ORDER).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getOrderById(req, res){
    const {
        id
    } = req.body
    await DB.getOrderById(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getOrdersByBusinessId(req, res){
    const {
        id
    } = req.body
    await DB.getOrdersByBusinessId(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function cancelOrderByOwner(req, res){
    const {
        id,
        comment
    } = req.body
    let new_odject = {
        statusId: STATIC.ORDER_STATUS.CANCEL_BY_OWNER,
        comment: comment
    }
    await DB.cancelOrderByOwner(id, new_odject).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function changeDeliveryPrice(req, res){
    const {
        id,
        deliveryPrice
    } = req.body
    let new_odject = {
        deliveryPrice: deliveryPrice,
    }
    await DB.changeDeliveryPrice(id, new_odject).then(async result => {
        await DB.getOrderDetailById(id).then(async res_detail => {
            await DB.getOrderById(res_detail.order.id).then(async res_order => {
                let total = 0
                res_order.order_details.forEach(de => {
                    total += (de.deliveryPrice + (de.product.price * de.amount))
                })
                await  DB.updateOrderById(res_detail.order.id, {total: total}).then(async res_update_order => {
                    return res.json(true)
                })
            })
        })
        return res.json(true)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function startShipping(req, res){
    const {
        orderId,
        listDeliveryCode
    } = req.body
    let shippingStatus = STATIC.ORDER_STATUS.SHIPPING
    await  DB.updateOrderById(orderId, {statusId: shippingStatus}).then(async res_order => {
        for(let i = 0 ; i < listDeliveryCode.length ; i++) {
            await DB.updateOrderDetailById(listDeliveryCode[i].id, {deliveryCode: listDeliveryCode[i].deliveryCode}).then(res_detail => {
                if((i+1) === listDeliveryCode.length){
                    return res.json(true)
                }
            })
        }
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function cencalOrderByCustomer(req, res){
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.ORDER_STATUS.CANCEL_BY_CUSTOMER
    }
    await DB.updateOrderById(id, new_odject).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function updateDeliverSuccess(req, res){
    const {
        id
    } = req.body
    let new_odject = {
        statusId: STATIC.ORDER_STATUS.DELIVERED
    }
    await DB.updateOrderById(id, new_odject).then(result => {
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
    createOrder,
    getSizeMyOrderByCustomerId,
    getMyOrders,
    getSizeNewOrderByBusinessId,
    getNewOrderByBusinessId,
    getOrderById,
    getOrdersByBusinessId,
    cancelOrderByOwner,
    changeDeliveryPrice,
    startShipping,
    cencalOrderByCustomer,
    updateDeliverSuccess
}