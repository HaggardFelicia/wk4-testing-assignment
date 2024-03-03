const Movie = require('../models/Movies');
const Director = require('../models/Directors');

const getAllMovies = async (req, res) => {
    //try code block to get all movies with a success message
    try{
        const movies = await Movies.find({});
        res.status(200).json({ 
            data: movies,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const getMovieById = async (req, res) => {
    const {id} = req.params;
    //try code block to get a movie by id with a success message
    try{
        const movie = await Movies.findById(id);
        res.status(200).json({ 
            data: movie,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
}

const createMovie = async (req, res) => {
    //try code block to create a new movie with a success message
    try{
        const {movie} = req.body;
        const director = await Director.findById(movie.director);
        //attaching the director object to the movie
        movie.director = director;
        //ceates a new movie model
        const newMovie = new Movie(movie);
        //push the movie id to the directer.books array
        director.movies.push(newMovie._id);
        //saves the movie and director data
        const queries = [newMovie.save(), director.save()];
        await Promise.all(queries);
        console.log('data >>>', newMovie);
        res.status(200).json({ 
            data: newMovie,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const updateMovie = async (req, res) => {
    const {id} = req.params;
    //try code block to update a movie by id with a success message
    try{
        const movie = await Movies.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ 
            data: movie,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const deleteMovie = async (req, res) => {
    const {id} = req.params;
    //try code block to delete a director with a success message
    try{
        const movie = await Movies.findByIdAndDelete(id, req.body, { new: false });
        res.status(200).json({ 
            id,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};