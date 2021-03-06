const TIMELOGIN = 5 // Hours
const USERROLE = {
    ADMIN: 1,
    SHOP_OWNER: 2,
    RENTAL_OWNER: 3,
    CUSTOMER: 50
}
const LOGOWNER = {
    WAITING: 'WAITING_REVIEW',
    APPROVE: 'APPROVE',
    REJECT: 'REJECT'
}
const ORDER_STATUS = {
    NEW_ORDER: 1,
    SHIPPING: 5,
    CANCEL_BY_OWNER: 80,
    CANCEL_BY_CUSTOMER: 81,
    DELIVERED: 99
}
const ROOMSTATUS = {
    BLANK_ROOM: 1,
    BUSY_ROOM: 2,
    IS_BOOKING: 3
}
const BUSINESSTYPE = {
    SHOP: 1,
    RENTAL: 2
}
const BOOKINGSTATUS = {
    NEW_BOOKING: 1,
    WAITING_CHECK_IN: 2, 
    CHECK_IN: 3,
    CHECK_OUT: 4,
    CANCEL_BY_CUSTOMER: 50,
    CANCEL_BY_OWNER: 51
}
module.exports = {
    TIMELOGIN,
    USERROLE,
    LOGOWNER,
    ORDER_STATUS,
    ROOMSTATUS,
    BUSINESSTYPE,
    BOOKINGSTATUS
}