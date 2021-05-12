module.exports = (sequelize, Sequelize) => {
    const LogOwnerRegister = sequelize.define('log_owner_register', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        approveStatus: {
            type: Sequelize.STRING,
            allowNull: false
        }
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return LogOwnerRegister;
};