import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        require: true
    },

    genre: {
        type: String,
        trim: true,
        require: true
    },

    director: {
        type: String,
        require: true,
        trim:  true,
    },

    year: {
        type: Number,
        require: true
    },

    type: {
        type: String,
        require: true
    },

    rating: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        require: true
    }

})

const review = mongoose.model('review', reviewSchema);

export default review;