module.exports = (sequelize, Sequelize) => {
    const AttractionType = sequelize.define('attraction_type', {
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

    return AttractionType;
};