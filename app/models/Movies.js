const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'You are required to have a title'],
            unique: true,
            trim: true,
            maxlength: [170, 'Title cannot be more than 170 characters'],
        },
        genre:{
            type: String,
            required: [true, 'You are required to have a genre'],
            enum: [
                "Action",
                "Adventure",
                "Animation",
                "Crime",
                "Comedy",
                "Drama",
                "Horror",
                "Mystery",
                "Thriller",
                "Western",
                "Science Fiction",
            ],
        },
        director:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director'
        },
        year: {
            type: Number,
            required: [true, 'You are required to have a year'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Movie', moviesSchema);