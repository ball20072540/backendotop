module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define('room', {
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
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        statusId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        roomName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        floor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        rateDay: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        rateMonth: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        detail: {
            type: Sequelize.STRING,
            allowNull: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        updated: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

    return Room;
};