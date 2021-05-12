const db = require('../../config/database');

//Table
const Order = db.Order
const OrderDetail = db.OrderDetail
const OrderStatus = db.OrderStatus
const Business = db.Business
const BusinessLogo = db.BusinessLogo
const Product = db.Product
const ProductSuffix = db.ProductSuffix
const ProductType = db.ProductType
const ProductImage = db.ProductImage
const User = db.User
const UserImage = db.UserImage

// Create
function createOrder(order){
    return new Promise((resolve,reject) => {
        Order.create(order).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

function createOrderDetail(detail){
    return new Promise((resolve,reject) => {
        OrderDetail.create(detail).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

// Query
function getOrderByCustomerAndStatus(customerId, status){
    return new Promise((resolve,reject) => {
        Order.findAll({
            where: {
                customerId: customerId,
                statusId: status
            }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getMyOrders(customerId){
    return new Promise((resolve,reject) => {
        Order.findAll({
            include: [
                { model: OrderStatus },
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            include: [
                                { model: ProductImage },
                                { model: ProductType },
                                { model: ProductSuffix }
                            ]
                        }
                    ]
                }
            ],
            where: {
                customerId: customerId
            },
            order: [
                ['statusId', 'ASC'],
                ['created', 'ASC']
            ],
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getOrderByBusinessIdAndStatus(businessId, status){
    return new Promise((resolve,reject) => {
        let w = {businessId: businessId}
        if(status){
            w = { ...w, statusId: status }
        }
        Order.findAll({
            include: [
                { model: OrderStatus },
                { model: User },
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            include: [
                                { model: ProductImage },
                                { model: ProductType },
                                { model: ProductSuffix }
                            ]
                        }
                    ]
                }
            ],
            where: w,
            order: [
                ['statusId', 'ASC'],
                ['created', 'ASC']
            ],
        }).then(data => {
            for(let i = 0 ; i < data.length ; i++){
                data[i].user.username = null
                data[i].user.password = null
                data[i].user.accessToken = null
                data[i].user.refreshToken = null
                data[i].user.lastLogin = null
            }
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getOrderById(id){
    return new Promise((resolve,reject) => {
        Order.findOne({
            include: [
                { model: OrderStatus },
                {
                    model: User,
                    include: [
                        { model: UserImage }
                    ]
                },
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            include: [
                                { model: ProductImage },
                                { model: ProductType },
                                { model: ProductSuffix }
                            ]
                        }
                    ]
                }
            ],
            where: { id: id }
        }).then(data => {
            data.user.username = null
            data.user.password = null
            data.user.accessToken = null
            data.user.refreshToken = null
            data.user.lastLogin = null
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getOrderDetailById(id){
    return new Promise((resolve,reject) => {
        OrderDetail.findOne({
            include: [
                { model: Order },
            ],
            where: { id: id }
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getOrdersByBusinessId(businessId){
    return new Promise((resolve,reject) => {
        Order.findAll({
            include: [
                { model: OrderStatus },
                {
                    model: User,
                    include: [
                        { model: UserImage }
                    ]
                },
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                {
                    model: OrderDetail,
                    include: [
                        {
                            model: Product,
                            include: [
                                { model: ProductImage },
                                { model: ProductType },
                                { model: ProductSuffix }
                            ]
                        }
                    ]
                }
            ],
            where: { businessId: businessId },
            order: [ ['statusId', 'ASC'] ]
        }).then(data => {
            data.forEach((ord, i) => {
                data[i].user.username = null
                data[i].user.password = null
                data[i].user.accessToken = null
                data[i].user.refreshToken = null
                data[i].user.lastLogin = null
            })
            
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update
function cancelOrderByOwner(id, data){
    return new Promise((resolve,reject) => {
        Order.update(data, {
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

function updateOrderById(id, data){
    return new Promise((resolve,reject) => {
        Order.update(data, {
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

function updateOrderDetailById(id, data){
    return new Promise((resolve,reject) => {
        OrderDetail.update(data, {
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


function changeDeliveryPrice(id, data){
    return new Promise((resolve,reject) => {
        OrderDetail.update(data, {
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

module.exports = {
    createOrder,
    createOrderDetail,
    getOrderByCustomerAndStatus,
    getMyOrders,
    getOrderByBusinessIdAndStatus,
    getOrderById,
    getOrderDetailById,
    getOrdersByBusinessId,
    cancelOrderByOwner,
    updateOrderById,
    updateOrderDetailById,
    changeDeliveryPrice
}