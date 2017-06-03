import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../my_modules/users/user.model';

const localOption = {
    usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOption, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if(!user) {
            return done(null, false);
        } else if(!user.authenticateUser(password)) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(localStrategy);

export const authLocal = passport.authenticate('local', { 
    session: false
});