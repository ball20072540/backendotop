module.exports = (sequelize, Sequelize) => {
    const UserImage = sequelize.define('user_image', {
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
        namePictureProfile: {
            type: Sequelize.STRING,
            allowNull: true
        },
        namePictureIdCard: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urlPictureProfile: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urlPictureIdCard: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return UserImage;
};