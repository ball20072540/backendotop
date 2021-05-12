module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define('product_image', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
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

    return ProductImage;
};