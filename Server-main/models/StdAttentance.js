module.exports = (sequelize, DataTypes) => {
  const StdAttendance = sequelize.define("StdAttendance", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Attendance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return StdAttendance;
};
