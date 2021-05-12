module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        businessId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        suffixId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        typeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        created: {
            type: Sequelize.DATE,
            allowNull: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        detail: {
            type: Sequelize.STRING,
            allowNull: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
      },
      {
        timestamps: false,
        freezeTableName: true
      }
    );

    return Product;
};