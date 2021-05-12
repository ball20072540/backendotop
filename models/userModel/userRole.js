module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define('user_role', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return UserRole;
};