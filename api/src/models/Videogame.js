const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: true,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      background_image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://images.wallpapersden.com/image/download/call-of-duty-cold-war-4k_bGdsbWaUmZqaraWkpJRnbW1lrWZtZWU.jpg",
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
      },
      created: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
         allowNull: true,
        //  validate: {
        //    notEmpty: true,
        //  },
       },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          max: 5,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
