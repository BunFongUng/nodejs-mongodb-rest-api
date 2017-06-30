// external imports
import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';
import Post from '../posts/post.model';

//internal imports
import { passwordReg } from './user.validation';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

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
    },
    favorites: {
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }]
    },
}, {
        timestamps: true
    });

UserSchema.plugin(uniqueValidator, {
    message: '{VALUE} alreay token.'
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
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
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            constants.JWT_SECRET,
        );
    },
    toAuthJSON() {
        return {
            _id: this._id,
            user_name: this.user_name,
            email: this.email,
            token: `JWT ${this.createToken()}`
        };
    },
    toJSON() {
        return {
            _id: this._id,
            user_name: this.user_name,
            email: this.email
        };
    },
    _favorites: {
      async posts(postId) {
        if(this.favorites.posts.indexOf(postId) > -1) {
          this.favorites.posts.remove(postId)
          await Post.decFavoriteCount(postId);
        } else {
          this.favorites.posts.push(postId)
          await Post.incFavoriteCount(postId);
        }
        return this.save();
      },
      isPostIsFavorite(postId) {
        if(this.favorites.posts.indexOf(postId) > -1) {
          return true;
        }
        return false;
      }
    },
}

export default mongoose.model('User', UserSchema);
