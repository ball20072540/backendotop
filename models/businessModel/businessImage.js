module.exports = (sequelize, Sequelize) => {
    const BusinessImage = sequelize.define('business_image', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        businessId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        imageName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return BusinessImage;
};