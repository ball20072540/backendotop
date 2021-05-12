module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        businessId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        statusId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        orderCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created: {
            type: Sequelize.DATE,
            allowNull: true
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true
        },
        total: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    return Order;
};