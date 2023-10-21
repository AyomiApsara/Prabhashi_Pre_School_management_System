module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,     
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherNIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Grade, {
      onDelete: "cascade",
      foreignKey: 'teacherId' 
    });
  };
  return Teacher;
};
