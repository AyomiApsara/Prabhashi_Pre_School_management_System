module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    attendanceId:   {
      type: DataTypes.INTEGER,  // Assuming userId is an integer
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,      // Set auto-increment to true
  },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: false,
    },
  });

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, {
      foreignKey: 'studentId', // Add the foreign key that references the Teacher model
    });
    
  };
 
  return Attendance;
};
