//require('dotenv').config()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const secret = 'THGYMNVJCGSJHFYAMCJOTOP'

// const pathWithOutAuthen = [
// 	'/',
//     '/api/getUserById',
// ]

// const pathWithSecret = [
// 	'/api/login',

// 	//ใช้จริง
// 	'/api/createBusiness',
// 	'/api/getBusinessById'
// ]

const authen = (req, res, next) => {
	if(!req.headers['secret']){
		return res.json({
			success: false,
			error: "Not found Secret key"
		}, 403)
	}else if(secret !== req.headers["secret"]){
		return res.json({
			success: false,
			error: "Can't get Secret key"
		}, 403)
	}
	return next()
}

module.exports = authen
