import express  from "express";
import { addReview, getAllReviews, deleteReview, updateReview } from "../controllers/reviewController.js";

const router = express.Router()

router.post('/', addReview)
      .get('/', getAllReviews)
      .patch('/:id', updateReview)
      .delete('/:id', deleteReview);

export default router;
