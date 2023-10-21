module.exports = (sequelize, DataTypes) => {
  const CreateEvo = sequelize.define("CreateEvo", {
    EvoType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  CreateEvo.associate = (models) => {
    CreateEvo.hasMany(models.TermEvo),
      {
        onDelete: "cascade",
      };
  };

  return CreateEvo;
};
