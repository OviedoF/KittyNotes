const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(new localStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, async (name, password, done) => {

    const user = await User.findOne({name: name});

    if (!user) {
        return done(null, false, {message: 'Not User Found'});
    } else {
        const matched = await user.matchPasswords(password);

        if (matched) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect Password'})
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (Error, user) => {
        done(Error, user);
    })
});