const db = require('../../config/database');

//Table
const Product = db.Product
const ProductSuffix = db.ProductSuffix
const ProductType = db.ProductType
const ProductImage = db.ProductImage
const MapProductPackaging = db.MapProductPackaging
const Packaging = db.Packaging
const Business = db.Business
const BusinessLogo = db.BusinessLogo
const DeliveryService = db.DeliveryService

//Query
function getProductType(){
    return new Promise((resolve,reject) => {
        ProductType.findAll().then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}
function getProductSuffix(){
    return new Promise((resolve,reject) => {
        ProductSuffix.findAll().then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}
function getProductById(id){
    return new Promise((resolve,reject) => {
        Product.findOne({
            include: [
                { model: ProductImage },
                { model: ProductType },
                { model: ProductSuffix },
                {
                    model: MapProductPackaging,
                    include: [
                        {
                            model: Packaging,
                            include: [
                                { model: DeliveryService },
                            ]
                        },
                    ]
                },
            ],
            where: { id: id }
        }).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}
function getProduct(orderBy){
    return new Promise((resolve,reject) => {
        let modelQuery = {
            include: [
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                { model: ProductImage },
                { model: ProductType },
                { model: ProductSuffix },
                {
                    model: MapProductPackaging,
                    include: [
                        { model: Packaging },
                    ]
                },
            ],
            where: {
                active: true
            }
        }
        if(orderBy){
            switch(orderBy){
                case 'DATE-DESC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['created', 'DESC'] ]
                    }
                    break
                case 'DATE-ASC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['created', 'ASC'] ]
                    }
                    break
                case 'PRICE-DESC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['price', 'DESC'] ]
                    }
                    break
                case 'PRICE-ASC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['price', 'ASC'] ]
                    }
                    break
            }  
        }
        Product.findAll(modelQuery).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function getProductOwner(id){
    return new Promise((resolve,reject) => {
        let modelQuery = {
            include: [
                {
                    model: Business,
                    include: [
                        { model: BusinessLogo },
                    ]
                },
                { model: ProductImage },
                { model: ProductType },
                { model: ProductSuffix },
                {
                    model: MapProductPackaging,
                    include: [
                        { model: Packaging },
                    ]
                },
            ],
            where: {
                businessId: id
            }
        }
        /*
        if(orderBy){
            switch(orderBy){
                case 'DATE-DESC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['created', 'DESC'] ]
                    }
                    break
                case 'PRICE-DESC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['price', 'DESC'] ]
                    }
                    break
                case 'PRICE-ASC': 
                    modelQuery = {
                        ...modelQuery,
                        order: [ ['price', 'ASC'] ]
                    }
                    break
            }  
        }
        */
        Product.findAll(modelQuery).then(data => { 
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}


// Create
function createProduct(product){
    return new Promise((resolve,reject) => {
        product = {
            ...product,
            created: new Date()
        }
        Product.create(product).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createProductImage(img){
    return new Promise((resolve,reject) => {
        ProductImage.create(img).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createProductImage(img){
    return new Promise((resolve,reject) => {
        ProductImage.create(img).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

function createProductMapPackaging(package){
    return new Promise((resolve,reject) => {
        MapProductPackaging.create(package).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// Update 
function toggleStatus(id, data){
    return new Promise((resolve,reject) => {
        Product.update(data, {
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
    getProductType,
    getProductSuffix,
    getProductById,
    getProduct,
    getProductOwner,

    createProduct,
    createProductImage,
    createProductMapPackaging,
    toggleStatus
}