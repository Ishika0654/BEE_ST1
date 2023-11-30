const Movie = require('./models/Movie');

const movieController = {
    createMovie: async (req, res) => {
        try {
            const { title, description, genre, releaseYear } = req.body;
            
            const movie = new Movie({
                title,
                description,
                genre,
                releaseYear
            });
            
            await movie.save();
            
            res.status(201).json({ message: 'Movie created successfully', movie });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getAllMovies: async (req, res) => {
        const { page = 1, pageSize = 10 } = req.query;
        const skip = (page - 1) * pageSize;

        try {
            const movies = await Movie.find()
                .skip(skip)
                .limit(parseInt(pageSize));

            res.status(200).json({ movies });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getMovieById: async (req, res) => {
        const { movieId } = req.params;

        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({ movie });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    updateMovie: async (req, res) => {
        const { movieId } = req.params;
        const { title, description, genre, releaseYear } = req.body;

        try {
            const movie = await Movie.findByIdAndUpdate(movieId, {
                title,
                description,
                genre,
                releaseYear
            }, { new: true });

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({ message: 'Movie updated successfully', movie });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteMovie: async (req, res) => {
        const { movieId } = req.params;

        try {
            const movie = await Movie.findByIdAndRemove(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

module.exports = movieController;
