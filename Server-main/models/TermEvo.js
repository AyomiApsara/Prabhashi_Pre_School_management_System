module.exports = (sequelize, DataTypes) => {
  const TermEvo = sequelize.define("TermEvo", {
    EvoType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Mark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return TermEvo;
};
