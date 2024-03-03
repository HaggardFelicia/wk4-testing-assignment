const router = require('express').Router();
const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controller/movieController');

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;