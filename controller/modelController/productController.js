const DB = require('../dbController/productController')

//Query
async function getProductType(req, res){
    await DB.getProductType().then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}
async function getProductSuffix(req, res){
    await DB.getProductSuffix().then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getProductById(req, res){
    const {
        id
    } = req.body
    await DB.getProductById(Number(id)).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getProduct(req, res){
    const {
        orderBy
    } = req.query
    await DB.getProduct(orderBy).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function getProductOwner(req, res){
    const {
        id
    } = req.body
    await DB.getProductOwner(id).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

async function toggleStatus(req, res){
    const {
        id,
        status
    } = req.body
    let new_odject = { active: status }
    await DB.toggleStatus(id, new_odject).then(result => {
        return res.json(result)
    }).catch(err => {
        console.log(err)
        return res.json({
            success: false,
            error: `Internal Server Error : ${err}` // Error ไม่ทราบสาเหตุ
        }, 500) // 500 : Internal Server Error มีข้อผิดพลาดบางอย่างภายใน ไม่ทราบสาเหตุ
    })
}

//Create
async function createProduct(req, res){  
    const {
        product,
        images,
        packaging
    } = req.body

    await DB.createProduct(product).then(async res_product => {
        for(let i = 0 ; i < images.length ; i++){
            let img = {
                ...images[i],
                productId: res_product.id
            }
            await DB.createProductImage(img)
        }
        for(let i = 0 ; i < packaging.length ; i++){
            let package = {
                ...packaging[i],
                productId: res_product.id
            }
            await DB.createProductMapPackaging(package)
        }


        await DB.getProductById(res_product.id).then(product_res => {
            return res.json(product_res)
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

module.exports = {
    getProductType,
    getProductSuffix,
    getProductById,
    getProduct,
    getProductOwner,

    createProduct,
    toggleStatus
}