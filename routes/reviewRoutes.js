const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');

// Define review routes with corresponding controller functions
router.post('/', reviewController.addReviewToMovie);
router.get('/', reviewController.getAllReviewsForMovie);
router.put('/:reviewId', reviewController.updateReviewInMovie);
router.delete('/:reviewId', reviewController.deleteReviewInMovie);

module.exports = router;
