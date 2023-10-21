module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define("Grade", {
    gradeId:   {
      type: DataTypes.INTEGER,  // Assuming userId is an integer
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,      // Set auto-increment to true
  },
    gradeName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  });

  Grade.associate = (models) => {
    Grade.hasMany(models.Student, {
      onDelete: "cascade",
    });
    Grade.belongsTo(models.Teacher, {
      foreignKey: 'teacherId', // Add the foreign key that references the Teacher model
    });
  };
 
  return Grade;
};
