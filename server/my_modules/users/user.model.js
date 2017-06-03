import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import { passwordReg } from './user.validation';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not valid email!'
        }
    },
    first_name: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true
    },
    user_name: {
        type: String,
        required: [true, 'userName is required!'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password mush be 6 character or longer!'],
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not valid password'
        }
    }
});

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    }
}

export default mongoose.model('User', UserSchema);