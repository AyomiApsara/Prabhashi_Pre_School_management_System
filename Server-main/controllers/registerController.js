const { User } = require("../models");


const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });


    User.findOne({ where: { username: username } })
        .then(async user => {
            if (user) {
                // User found
                return res.sendStatus(409); //Conflict 
            } else {
                // User not found
                try {
                    //encrypt the password
                    const hashedPwd = await bcrypt.hash(password, 10);
                    //store the new username
                    const newUser = { "username": username, "password": hashedPwd };


                    User.create(newUser)
                        .then(user => {
                            // User saved successfully
                            console.log('User saved:', user);
                        })
                        .catch(error => {
                            // Error occurred
                            console.error('Error saving user:', error);
                        });
                    res.status(201).json({ 'success': `New username ${username} created!` });
                } catch (err) {
                    res.status(500).json({ 'message': err.message });
                }
            }
        })
        .catch(error => {
            // Error occurred
            console.error(error);
        });

}

module.exports = { handleNewUser };