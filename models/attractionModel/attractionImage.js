module.exports = (sequelize, Sequelize) => {
    const AttractionImage = sequelize.define('attraction_image', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        attractionId: {
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

    return AttractionImage;
};