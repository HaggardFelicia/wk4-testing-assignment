const Movie = require('../models/Movies');
const Director = require('../models/Directors');

const getAllMovies = async (req, res) => {
    //try code block to get all movies with a success message
    try{
        const movies = await Movie.find({});
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
        const movie = await Movie.findById(id);
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

    const movie = req.body.movie;
    const directorData = await Director.findById(movie.director);
    movie.director = directorData;
    const newMovie = new Movie(movie);
    directorData.movie.push(newMovie._id);
    const queries = [newMovie.save(), directorData.save()];
        await Promise.all(queries);
        console.log('data >>>', newMovie);
        res.status(200).json({ 
            data: newMovie,
            message: `${req.method} - request to Movie endpoint`, 
            success: true
        });
    Movie.find({
        title: req.body.title,
        director: req.body.director
    })
    .exec()
    .then(result =>{
        console.log(result);
        if(result.length > 0){
            return res.status(409).json({
                message: 'Movie already exists'
            });
        }
        const newMovie = new Movie({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            director: req.body.director
        });
        newMovie.save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Movie saved',
                movie: {
                    title: result.title,
                    director: result.director,
                    _id: result._id,
                    metadata:{
                        method: req.method,
                        host: req.hostname,
                    }
                }
            })
        })
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({
                error: err.message
            })
        })
    })
    .catch(err=>{
        //console.error(error);
        res.status(500).json({
            err: 'Unable to save movie'
        })
    })
};

const updateMovie = async (req, res) => {
    const {id} = req.params;
    //try code block to update a movie by id with a success message
    try{
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
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
        const movie = await Movie.findByIdAndDelete(id, req.body, { new: false });
        res.status(200).json({ 
            id,
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


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};