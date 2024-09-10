import mongoose from "mongoose";

const rentedBooksSchema = mongoose.Schema({
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
    rentDate: {
        type: Date,
        required: false
    },
    returnDate: {
        type: Date,
        required: false
    }
}, {timestamps: true});

export const RentedBooks = mongoose.model("rentedBooks", rentedBooksSchema);