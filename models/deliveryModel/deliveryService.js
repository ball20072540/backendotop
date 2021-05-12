module.exports = (sequelize, Sequelize) => {
    const DeliveryService = sequelize.define('delivery_service', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        deliveryName: {
            type: Sequelize.STRING,
            allowNull: false
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return DeliveryService;
};