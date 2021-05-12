module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define('order_detail', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        deliveryPrice: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        beforeDeliveryPrice: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        deliveryCode: {
            type: Sequelize.STRING,
            allowNull: true
        }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    return OrderDetail;
};