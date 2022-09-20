const { DataTypes } = require("sequelize");
// Export define model function 
// Then inject sequelize connection 
module.exports = (sequelize) => {
  // define model
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER
      },
      steps: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
        // defaultValue:
        //   "https://www.trecebits.com/wp-content/uploads/2020/05/Cocina-800x445.jpg",
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
