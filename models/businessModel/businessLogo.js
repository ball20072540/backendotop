module.exports = (sequelize, Sequelize) => {
    const BusinessLogo = sequelize.define('business_logo', {
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

    return BusinessLogo;
};