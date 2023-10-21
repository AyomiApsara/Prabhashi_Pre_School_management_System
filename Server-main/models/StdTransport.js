module.exports = (sequelize, DataTypes) => {
  const StdTransport = sequelize.define("StdTransport", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Transport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return StdTransport;
};
