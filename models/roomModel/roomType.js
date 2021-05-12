module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define('room_type', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        typeName: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

    return RoomType;
};