module.exports = (sequelize, Sequelize) => {
    const BusinessType = sequelize.define('business_type', {
        id: {
            type: Sequelize.INTEGER,
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

    return BusinessType;
};