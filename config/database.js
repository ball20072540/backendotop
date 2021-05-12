// const Sequelize = require('sequelize');
// const env = require('../env');
// const sequelize = new Sequelize(env.database, env.username, env.password, {
//     host: env.host,
//     dialect: env.dialect,
//     operatorsAliases: false,
//     pool: {
//       max: env.max,
//       min: env.pool.min,
//       acquire: env.pool.acquire,
//       idle: env.pool.idle
//     }
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

//---------------------------------- Table ---------------------------------- 
// db.User = require('../models/userModel/user')(sequelize, Sequelize);
// db.UserRole = require('../models/userModel/userRole')(sequelize, Sequelize);
// db.UserImage = require('../models/userModel/userImage')(sequelize, Sequelize);

// db.Event = require('../models/eventsModal/event')(sequelize, Sequelize);
// db.EventImage = require('../models/eventsModal/eventImage')(sequelize, Sequelize);

// db.Attraction = require('../models/attractionModel/attraction')(sequelize, Sequelize);
// db.AttractionImage = require('../models/attractionModel/attractionImage')(sequelize, Sequelize);
// db.AttractionType = require('../models/attractionModel/attractionType')(sequelize, Sequelize);

// db.Business = require('../models/businessModel/business')(sequelize, Sequelize);
// db.BusinessImage = require('../models/businessModel/businessImage')(sequelize, Sequelize);
// db.BusinessLicense = require('../models/businessModel/businessLicense')(sequelize, Sequelize);
// db.BusinessLogo = require('../models/businessModel/businessLogo')(sequelize, Sequelize);
// db.BusinessType = require('../models/businessModel/businessType')(sequelize, Sequelize);

// db.LogOwnerRegister = require('../models/logModel/logOwnerRegister')(sequelize, Sequelize);

// db.DeliveryService = require('../models/deliveryModel/deliveryService')(sequelize, Sequelize);
// db.Packaging = require('../models/packagingModel/packaging')(sequelize, Sequelize);

// db.MapProductPackaging = require('../models/productModel/mapProductPackaging')(sequelize, Sequelize);
// db.Product = require('../models/productModel/product')(sequelize, Sequelize);
// db.ProductImage = require('../models/productModel/productImage')(sequelize, Sequelize);
// db.ProductSuffix = require('../models/productModel/productSuffix')(sequelize, Sequelize);
// db.ProductType = require('../models/productModel/productType')(sequelize, Sequelize);

// db.Order = require('../models/orderModel/order')(sequelize, Sequelize);
// db.OrderDetail = require('../models/orderModel/orderDetail')(sequelize, Sequelize);
// db.OrderStatus = require('../models/orderModel/orderStatus')(sequelize, Sequelize);

// db.Room = require('../models/roomModel/room')(sequelize, Sequelize);
// db.RoomType = require('../models/roomModel/roomType')(sequelize, Sequelize);
// db.RoomStatus = require('../models/roomModel/roomStatus')(sequelize, Sequelize);
// db.RoomImage = require('../models/roomModel/roomImage')(sequelize, Sequelize);

// db.Booking = require('../models/bookingModel/booking')(sequelize, Sequelize);
// db.BookingStatus = require('../models/bookingModel/bookingStatus')(sequelize, Sequelize);

// db.Banner = require('../models/bannerModel/banner')(sequelize, Sequelize);
// //---------------------------------- Map Table ----------------------------------
// db.UserRole.hasMany(db.User, {foreignKey: 'role_id', targetKey: 'id'})
// db.User.belongsTo(db.UserRole, {foreignKey: 'role_id', targetKey: 'id'})

// db.User.hasOne(db.UserImage, {foreignKey: 'userId', targetKey: 'id'})
// db.UserImage.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'})

// db.User.hasMany(db.Event, {foreignKey: 'createBy', targetKey: 'id'})
// db.Event.belongsTo(db.User, {foreignKey: 'createBy', targetKey: 'id'})

// db.User.hasMany(db.Attraction, {foreignKey: 'createBy', targetKey: 'id'})
// db.Attraction.belongsTo(db.User, {foreignKey: 'createBy', targetKey: 'id'})

// db.Event.hasMany(db.EventImage, {foreignKey: 'eventId', targetKey: 'id'})
// db.EventImage.belongsTo(db.Event, {foreignKey: 'eventId', targetKey: 'id'})

// db.Attraction.hasMany(db.AttractionImage, {foreignKey: 'attractionId', targetKey: 'id'})
// db.AttractionImage.belongsTo(db.Attraction, {foreignKey: 'attractionId', targetKey: 'id'})

// db.AttractionType.hasMany(db.Attraction, {foreignKey: 'typeId', targetKey: 'id'})
// db.Attraction.belongsTo(db.AttractionType, {foreignKey: 'typeId', targetKey: 'id'})

// db.User.hasMany(db.Business, {foreignKey: 'userOwner', targetKey: 'id'})
// db.Business.belongsTo(db.User, {foreignKey: 'userOwner', targetKey: 'id'})

// db.Business.hasOne(db.BusinessLicense, {foreignKey: 'businessId', targetKey: 'id'})
// db.BusinessLicense.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.Business.hasOne(db.BusinessLogo, {foreignKey: 'businessId', targetKey: 'id'})
// db.BusinessLogo.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.Business.hasMany(db.BusinessImage, {foreignKey: 'businessId', targetKey: 'id'})
// db.BusinessImage.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.BusinessType.hasMany(db.Business, {foreignKey: 'typeId', targetKey: 'id'})
// db.Business.belongsTo(db.BusinessType, {foreignKey: 'typeId', targetKey: 'id'})

// db.User.hasOne(db.LogOwnerRegister, {foreignKey: 'ownerId', targetKey: 'id'})
// db.LogOwnerRegister.belongsTo(db.User, {foreignKey: 'ownerId', targetKey: 'id'})

// db.DeliveryService.hasMany(db.Packaging, {foreignKey: 'deliveryBy', targetKey: 'id'})
// db.Packaging.belongsTo(db.DeliveryService, {foreignKey: 'deliveryBy', targetKey: 'id'})

// db.Business.hasMany(db.Product, {foreignKey: 'businessId', targetKey: 'id'})
// db.Product.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.Product.hasMany(db.ProductImage, {foreignKey: 'productId', targetKey: 'id'})
// db.ProductImage.belongsTo(db.Product, {foreignKey: 'productId', targetKey: 'id'})

// db.ProductSuffix.hasMany(db.Product, {foreignKey: 'suffixId', targetKey: 'id'})
// db.Product.belongsTo(db.ProductSuffix, {foreignKey: 'suffixId', targetKey: 'id'})

// db.ProductType.hasMany(db.Product, {foreignKey: 'typeId', targetKey: 'id'})
// db.Product.belongsTo(db.ProductType, {foreignKey: 'typeId', targetKey: 'id'})

// db.Product.hasMany(db.MapProductPackaging, {foreignKey: 'productId', targetKey: 'id'})
// db.MapProductPackaging.belongsTo(db.Product, {foreignKey: 'productId', targetKey: 'id'})

// db.Packaging.hasMany(db.MapProductPackaging, {foreignKey: 'packagingId', targetKey: 'id'})
// db.MapProductPackaging.belongsTo(db.Packaging, {foreignKey: 'packagingId', targetKey: 'id'})

// db.OrderStatus.hasMany(db.Order, {foreignKey: 'statusId', targetKey: 'id'})
// db.Order.belongsTo(db.OrderStatus, {foreignKey: 'statusId', targetKey: 'id'})

// db.Business.hasMany(db.Order, {foreignKey: 'businessId', targetKey: 'id'})
// db.Order.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.User.hasOne(db.Order, {foreignKey: 'customerId', targetKey: 'id'})
// db.Order.belongsTo(db.User, {foreignKey: 'customerId', targetKey: 'id'})

// db.Order.hasMany(db.OrderDetail, {foreignKey: 'orderId', targetKey: 'id'})
// db.OrderDetail.belongsTo(db.Order, {foreignKey: 'orderId', targetKey: 'id'})

// db.Product.hasMany(db.OrderDetail, {foreignKey: 'productId', targetKey: 'id'})
// db.OrderDetail.belongsTo(db.Product, {foreignKey: 'productId', targetKey: 'id'})

// db.RoomType.hasMany(db.Room, {foreignKey: 'typeId', targetKey: 'id'})
// db.Room.belongsTo(db.RoomType, {foreignKey: 'typeId', targetKey: 'id'})

// db.RoomStatus.hasMany(db.Room, {foreignKey: 'statusId', targetKey: 'id'})
// db.Room.belongsTo(db.RoomStatus, {foreignKey: 'statusId', targetKey: 'id'})

// db.Room.hasMany(db.RoomImage, {foreignKey: 'roomId', targetKey: 'id'})
// db.RoomImage.belongsTo(db.Room, {foreignKey: 'roomId', targetKey: 'id'})

// db.Business.hasMany(db.Room, {foreignKey: 'businessId', targetKey: 'id'})
// db.Room.belongsTo(db.Business, {foreignKey: 'businessId', targetKey: 'id'})

// db.BookingStatus.hasMany(db.Booking, {foreignKey: 'statusId', targetKey: 'id'})
// db.Booking.belongsTo(db.BookingStatus, {foreignKey: 'statusId', targetKey: 'id'})

// db.User.hasMany(db.Booking, {foreignKey: 'userId', targetKey: 'id'})
// db.Booking.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'})

// db.Room.hasMany(db.Booking, {foreignKey: 'roomId', targetKey: 'id'})
// db.Booking.belongsTo(db.Room, {foreignKey: 'roomId', targetKey: 'id'})

module.exports = db;