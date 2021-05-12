module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define('banner', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        bannerKey: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Banner;
};