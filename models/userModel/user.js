module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: true
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastLogin: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return User;
};