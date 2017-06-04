import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../my_modules/users/user.model';
import constants from '../config/constants';

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


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
    secretOrKey: constants.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload._id);

        if(!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { 
    session: false
});

export const authJwt = passport.authenticate('jwt', {
    session: false
});