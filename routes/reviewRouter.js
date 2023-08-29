import express  from "express";
import checkAuth from "../middlewere/authMiddlewere.js";
import { addReview, getAllReviews, getReviewsByType, deleteReview, updateReview } from "../controllers/reviewController.js";

const router = express.Router()

router.post('/', checkAuth, addReview)
      .get('/', checkAuth, getAllReviews)
      .patch('/:id', checkAuth, updateReview)
      .delete('/:id', checkAuth, deleteReview);

router.get('/:type', checkAuth, getReviewsByType);

export default router;
