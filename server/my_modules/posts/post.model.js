import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required!'],
        minlength: [3, 'Title need to be longer!'],
        unique: true
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Text is required!'],
        minlength: [10, 'Text need to be longer!']
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favoriteCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

PostSchema.plugin(uniqueValidator, {
    message: '{VALUE} is already token.'
});

PostSchema.pre('validate', function(next) {
    this._slugtify();
    next();
});

PostSchema.methods = {
    _slugtify() {
        this.slug = slug(this.title);
    },
    toJSON() {
        return {
            _id: this._id,
            createdAt: this.createdAt,
            slug: this.slug,
            title: this.title,
            text: this.text,
            user: this.user,
            favoriteCount: this.favoriteCount
        }
    }
};

PostSchema.statics = {
    createPost(args, user) {
        return this.create({
            ...args,
            user
        });
    },
    list({ skip = 0, limit = 10} = {}) {
        return this.find()
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .populate('user');
    }
};

export default mongoose.model('Post', PostSchema);