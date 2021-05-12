module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define('business', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userOwner: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        businessName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true
        },
        detail:{
            type: Sequelize.STRING,
            allowNull: true
        },
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Business;
};