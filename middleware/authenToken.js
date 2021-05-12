//require('dotenv').config()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const DB = require('../controller/dbController/userController')

const secret = 'THGYMNVJCGSJHFYAMCJOTOP'

// const pathWithOutAuthen = [
// 	'/',
// 	'/api/getUserById',
// ]

// const pathWithSecret = [
// 	'/api/login',
// ]

const authen = (req, res, next) => {
	if(!req.headers['secret']){
		return res.json({
			success: false,
			error: "Not found Secret key"
		}, 403)
	}else{
		if(secret !== req.headers["secret"]){
			return res.json({
				success: false,
				error: "Can't get Secret key"
			}, 403)
		}
	}

	if(!req.headers['otop-x-authorization']){
		return res.json({
			success: false,
			error: 'Unauthorization'
		}, 403)
	}
	const token = req.headers['otop-x-authorization']
	DB.getUserByToken(token.split(' ')[1]).then(user_login => {
		const deTime = CryptoJS.AES.decrypt(user_login.lastLogin, '').toString(CryptoJS.enc.Utf8)
		let nowTime = new Date(Date.now())
		if(nowTime > Number(deTime)){
			return res.json({
				success: false,
				error: 'Token Time Out',
			}, 403)
		}else{
			return next()
		}
	}).catch(() => {
		return res.json({
			success: false,
			error: 'Invalid Token',
		}, 401)
	})
}

module.exports = authen
