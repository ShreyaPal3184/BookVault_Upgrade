import mongoose from "mongoose";

const booksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: false
    },
}, {timestamps: true});

export const Books = mongoose.model("books", booksSchema)