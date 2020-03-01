const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        console.log(req.body)
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Error in signup!!! Try Again."
                });
            }
            else {
                res.json({
                    error: false,
                    message: "User added successfully!!!",
                    data: null
                });
            }
        });
    },

    authenticate: function (req, res, next) {
        console.log(req.body)
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (userInfo) {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "Error in signing in!!! Try Again."
                    });
                } else {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({ id: userInfo._id, name: userInfo.name, email: userInfo.email }, req.app.get('secretKey'));
                        // console.log(userInfo)
                        res.json({
                            error: false,
                            message: "User found. Login Successful",
                            data: userInfo,
                            token: token
                        });
                    } else {
                        res.json({
                            error: true,
                            message: "Invalid email or password!",
                            data: null
                        });
                    }
                }
            }
            else {
                return res.status(400).json({
                    error: true,
                    message: "User not found!"
                })
            }
        });
    },
    getUserById: function (req, res, next) {
        userModel.findById(req.params.id, (err, r) => {
            if (err || r == null) {
                return res.status(400).json({
                    error: true,
                    message: "User not found!"
                });
            }
            else {
                res.json({
                    error: false,
                    message: "User found!!!",
                    data: r
                });
            }
        })
    },
}