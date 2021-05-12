module.exports = (sequelize, Sequelize) => {
    const Attraction = sequelize.define('attraction', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        createBy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        attractionName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        attractionLogo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        details: {
            type: Sequelize.STRING,
            allowNull: true
        },
        openDay: {
            type: Sequelize.STRING,
            allowNull: true
        },
        timeOpen: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Attraction;
};