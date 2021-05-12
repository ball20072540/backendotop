module.exports = (sequelize, Sequelize) => {
    const EventImage = sequelize.define('event_image', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        eventId: {
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

    return EventImage;
};