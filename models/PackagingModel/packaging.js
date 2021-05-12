module.exports = (sequelize, Sequelize) => {
    const Packaging = sequelize.define('packaging', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        deliveryBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        packagingName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        wide: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        long: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        high: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        sizeName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sizeType: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Packaging;
};