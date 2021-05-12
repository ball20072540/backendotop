var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('update version to 100');
});

// const authenSecret = require("../middleware/authenSecret")
// const authenToken = require("../middleware/authenToken")

// const userController = require('../controller/modelController/userController')
// const eventController = require('../controller/modelController/eventController')
// const attractionController = require('../controller/modelController/attractionController')
// const businessController = require('../controller/modelController/businessController')
// const logController = require('../controller/modelController/logController')
// const productController = require('../controller/modelController/productController')
// const deliveryController = require('../controller/modelController/deliveryController')
// const orderController = require('../controller/modelController/orderController')
// const roomController = require('../controller/modelController/roomController')
// const bannerController = require('../controller/modelController/bannerController')


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/api/getUserById', authenSecret, userController.getUserById)

// //Banner
// router.get('/api/getBanner', authenSecret, bannerController.getBanner)

// //User
// router.post('/api/register', authenSecret, userController.register)
// router.post('/api/login', authenSecret, userController.login)
// router.get('/api/getUserByUsername', authenSecret, userController.getUserByUsername)
// router.get('/api/getUserByPhoneNumber', authenSecret, userController.getUserByPhoneNumber)
// router.get('/api/getUserByEmail', authenSecret, userController.getUserByEmail)

// //User - Change Password
// router.get('/api/changePassword', userController.changePassword)

// //Event
// router.get('/api/getEvents', authenSecret, eventController.getAllEvent)
// router.post('/api/admin/createEvent', authenToken, eventController.createEvent)
// router.post('/api/admin/removeEvent', authenToken, eventController.removeEvent)
// router.post('/api/admin/updateEvent', authenToken, eventController.updateEvent)
// router.post('/api/admin/removeEventImages', authenToken, eventController.removeEventImages)

// //Attraction
// router.get('/api/getAttractions', authenSecret, attractionController.getAllAttraction)
// router.get('/api/getAttractionType', authenSecret, attractionController.getAttractionType)
// router.post('/api/admin/createAttraction', authenToken, attractionController.createAttraction)
// router.post('/api/admin/removeImagesAttraction', authenToken, attractionController.removeImagesAttraction)
// router.post('/api/admin/removeAttraction', authenToken, attractionController.removeAttraction)
// router.post('/api/admin/updateAttraction', authenToken, attractionController.updateAttraction)

// //Business
// router.post('/api/registerBusiness', authenSecret, businessController.createBusiness)
// router.get('/api/getBusinessById', authenSecret, businessController.getBusinessById)
// router.post('/api/owner/getBusinessDetailByOwnerId', authenToken, businessController.getBusinessDetailByOwnerId)
// router.get('/api/getRentals', authenSecret, businessController.getRentals)

// //Log Register
// router.get('/api/admin/getSizeLogOwner', authenToken, logController.getSizeLogOwner)
// router.get('/api/admin/getBusinessRegister', authenToken, logController.getLogOwnerRegisterByType)
// router.get('/api/admin/getLogOwnerRegisterById', authenToken, logController.getLogOwnerRegisterById)
// router.post('/api/admin/updateLogOwnerRegister', authenToken, logController.updateLogOwnerRegister)

// //Product
// router.get('/api/getProductType', authenSecret, productController.getProductType)
// router.get('/api/getProductSuffix', authenSecret, productController.getProductSuffix)
// router.post('/api/owner/createProduct', authenToken, productController.createProduct)
// router.get('/api/getProduct', authenSecret, productController.getProduct)
// router.post('/api/owner/getProductOwner', authenToken, productController.getProductOwner)
// router.post('/api/owner/toggleStatus', authenToken, productController.toggleStatus)
// router.post('/api/owner/getProductById', authenToken, productController.getProductById)

// //Delivery Service
// router.get('/api/getDeliveryService', authenSecret, deliveryController.getDeliveryService)
// router.get('/api/getDeliveryPackaging', authenSecret, deliveryController.getDeliveryPackaging)

// //Order
// router.post('/api/createOrder', authenToken, orderController.createOrder)
// router.post('/api/getSizeMyOrderByCustomerId', authenToken, orderController.getSizeMyOrderByCustomerId)
// router.post('/api/getMyOrders', authenToken, orderController.getMyOrders)
// router.post('/api/getSizeNewOrderByBusinessId', authenToken, orderController.getSizeNewOrderByBusinessId)
// router.post('/api/owner/getNewOrderByBusinessId', authenToken, orderController.getNewOrderByBusinessId)
// router.post('/api/owner/getOrderById', authenToken, orderController.getOrderById)
// router.post('/api/owner/cancelOrderByOwner', authenToken, orderController.cancelOrderByOwner)
// router.post('/api/owner/changeDeliveryPrice', authenToken, orderController.changeDeliveryPrice)
// router.post('/api/owner/startShipping', authenToken, orderController.startShipping)
// router.post('/api/cencalOrderByCustomer', authenToken, orderController.cencalOrderByCustomer)
// router.post('/api/owner/getOrdersByBusinessId', authenToken, orderController.getOrdersByBusinessId)
// router.post('/api/owner/updateDeliverSuccess', authenToken, orderController.updateDeliverSuccess)

// //Room
// router.get('/api/getRoomType', authenSecret, roomController.getRoomType)
// router.post('/api/owner/getRoomsByBusinessId', authenToken, roomController.getRoomsByBusinessId)
// router.post('/api/owner/createRoom', authenToken, roomController.createRoom)
// router.post('/api/owner/editRoom', authenToken, roomController.editRoom)
// router.post('/api/owner/updateStatusOnline', authenToken, roomController.updateStatusOnline)
// router.post('/api/owner/getRoomById', authenToken, roomController.getRoomById)
// router.post('/api/owner/removeRoomImages', authenToken, roomController.removeRoomImages)
// router.post('/api/viewRooms', authenSecret, roomController.viewRooms)

// //Booking
// router.post('/api/createBooking', authenSecret, roomController.createBooking)
// router.post('/api/getBookingByCustomerId', authenSecret, roomController.getBookingByCustomerId)
// router.post('/api/cancelBookingByCustomer', authenSecret, roomController.cancelBookingByCustomer)
// router.post('/api/getDateBooking', authenSecret, roomController.getDateBooking)
// router.post('/api/owner/getNewBookingByBusinessId', authenToken, roomController.getNewBookingByBusinessId)
// router.post('/api/getSizeNewBooking', authenToken, roomController.getSizeNewBooking)
// router.post('/api/owner/cancelBookingByOwner', authenToken, roomController.cancelBookingByOwner)
// router.post('/api/owner/approveBooking', authenToken, roomController.approveBooking)
// router.post('/api/owner/getAllBookingByBusinessId', authenToken, roomController.getAllBookingByBusinessId)
// router.post('/api/owner/checkIn', authenToken, roomController.checkIn)
// router.post('/api/owner/checkOut', authenToken, roomController.checkOut)

module.exports = router;