const { User } = require("../models");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const path = require('path');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    User.findOne({ where: { username: username } })
        .then(async user => {
            console.log("user =" + JSON.stringify(user))
            if (user) {
                // User found
                // evaluate password 
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    // create JWTs
                    const accessToken = jwt.sign(
                        { "username": user.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    const refreshToken = jwt.sign(
                        { "username": user.username },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    // Saving refreshToken with current username
                    console.log("user.dataValues =" + JSON.stringify(user.dataValues))
                    const currentUser = { ...user.dataValues, refreshToken };
                    console.log("currentUser =" + JSON.stringify(currentUser))
                    User.update(currentUser,{ where: { username: currentUser.username } })
                        .then(user => {
                            // User saved successfully
                            console.log('User saved:', user);
                        })
                        .catch(error => {
                            // Error occurred
                            console.error('Error saving user:', error);
                        });
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                    res.json({ user,accessToken:accessToken });
                } else {
                    res.sendStatus(401);
                }
            } else {yield
                // User not found
                return res.sendStatus(401);
            }
        })
        .catch(error => {
            // Error occurred
            console.error(error);
        });;

}

module.exports = { handleLogin };