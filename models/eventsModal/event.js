module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
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
        eventName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        details: {
            type: Sequelize.STRING,
            allowNull: true
        },
        eventDay: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Event;
};