module.exports = (sequelize, DataTypes) => {
  const StdPayment = sequelize.define("StdPayment", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return StdPayment;
};
