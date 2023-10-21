module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userId: {
            type: DataTypes.INTEGER,  // Assuming userId is an integer
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,      // Set auto-increment to true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            primaryKey: false,
            defaultValue: 'student',
        }, refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
            primaryKey: false,
        },
    });


    return User;
};
