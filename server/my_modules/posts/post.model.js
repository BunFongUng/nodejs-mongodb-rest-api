import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import slug from 'slug';

const PostSchema = new Schema({
    title: {
        type: string,
        trim: true,
        required: [true, 'Title is required!'],
        minlength: [3, 'Title need to be longer!'],
        unique: true
    },
    text: {
        type: string,
        trim: true,
        required: [true, 'Text is required!'],
        minlength: [10, 'Text need to be longer!']
    },
    slug: {
        type: string,
        trim: true,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    favoriteCount: {
        type: number,
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
    }
};

export default mongoose.model('Post', PostSchema);