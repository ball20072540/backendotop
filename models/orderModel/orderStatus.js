module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define('order_status', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );
    return OrderStatus;
};