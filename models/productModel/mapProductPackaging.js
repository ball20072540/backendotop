module.exports = (sequelize, Sequelize) => {
    const MapProductPackaging = sequelize.define('map_product_packaging', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        packagingId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        amountMin: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        amountMax: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        packagingPrice: {
            type: Sequelize.DOUBLE,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return MapProductPackaging;
};