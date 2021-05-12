module.exports = (sequelize, Sequelize) => {
    const RoomStatus = sequelize.define('room_status', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        statusName: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

    return RoomStatus;
};