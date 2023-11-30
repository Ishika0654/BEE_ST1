const Movie = require('./models/Movie');
const Review = require('./models/Review');

const reviewController = {
    addReviewToMovie: async (req, res) => {
        const { movieId } = req.params;
        const { content, rating, author } = req.body;

        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            const newReview = new Review({
                content,
                rating,
                author,
            });

            movie.reviews.push(newReview);
            await movie.save();

            res.status(201).json({ message: 'Review added successfully', review: newReview });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getAllReviewsForMovie: async (req, res) => {
        const { movieId } = req.params;
        const { page = 1, pageSize = 10 } = req.query;
        const skip = (page - 1) * pageSize;

        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            const reviews = movie.reviews.slice(skip, skip + parseInt(pageSize));
            res.status(200).json({ reviews });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    updateReviewInMovie: async (req, res) => {
        const { movieId, reviewId } = req.params;
        const { content, rating, author } = req.body;

        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            const review = movie.reviews.id(reviewId);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            review.content = content || review.content;
            review.rating = rating || review.rating;
            review.author = author || review.author;

            await movie.save();

            res.status(200).json({ message: 'Review updated successfully', review });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteReviewInMovie: async (req, res) => {
        const { movieId, reviewId } = req.params;

        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            const review = movie.reviews.id(reviewId);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }

            review.remove();
            await movie.save();

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
};

module.exports = reviewController;
