module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define('booking', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        statusId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        roomId: {
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
        sizeDate: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        total: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        created: {
            type: Sequelize.DATE,
            allowNull: true
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

    return Booking;
};