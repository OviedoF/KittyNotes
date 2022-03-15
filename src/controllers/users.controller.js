const userController = {};
const User = require('../models/user.model');
const passport = require('passport');

/*-----Login User-----*/
userController.renderLogin = (req, res) => {
    res.render('users/login')
}

userController.loginUser = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/notes',
    failureFlash: true /*cuando existe un error usamos flash*/
});

/*-----Register User-----*/
userController.renderRegister = (req, res) => {
    res.render('users/register')
}

userController.register = async (req, res) => {
    errors = [];

    const {name, email, password, confirm_password} = req.body;

    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match.'})
    } 
    if (password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 characters.'});
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name,
            email
        })
    } else {
        try {
            const existUser = await User.findOne({name: name});
            const existEmail = await User.findOne({email:email});

            if(existUser || existEmail) {
                errors.push({text: 'Name or email is already in use'});
                res.render('users/register', {
                    errors: errors,
                    name,
                    email
                })
            } else {
                const newUser = new User({name: name, email: email, password: password});
                newUser.password = await newUser.encryptPasswords(password);
        
                await newUser.save();
        
                req.flash('success_msg', 'You are registered now :)')
                res.redirect('/login');
            }
    
        } catch (error) {
            console.log(error);
        }
    }
}

/*-----LOG OUT-----*/

userController.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');

    res.redirect('/login');
}

module.exports = userController;