import mongoose, { mongo } from "mongoose";

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    }
}, {timestamps: true});

export const Review = mongoose.model("review", reviewSchema);