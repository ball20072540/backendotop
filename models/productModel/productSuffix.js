module.exports = (sequelize, Sequelize) => {
    const ProductSuffix = sequelize.define('product_suffix', {
        id: {
            type: Sequelize.INTEGER,
            //field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        suffix: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

    return ProductSuffix;
};