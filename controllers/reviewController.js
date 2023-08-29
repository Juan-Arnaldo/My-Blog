import Review from "../models/review.js";
import z from 'zod';

/**
 * 
 * Endpoint to add a review
 * 
 * @returns the new review
 */
const addReview = async (req, res) => {
    const result = validateReview(req.body)
    if(result.error)
        return res.status(400).json({Error: JSON.parse(result.error.message)});

    try {

        const newReview = new Review(req.body);
        const reviewSave = await newReview.save();

        res.status(200).json({review: reviewSave});
        
    } catch (err) {
        res.status(500).json({message: 'internal server error'});
    }
}

/**
 * 
 *  Endpoint to get all reviews
 * 
 *  @returns all reviews
 */
const getAllReviews = async (req, res) => {

    try {
        
        const reviews = await Review.find();
        res.status(200).json({reviews});
        
    } catch (err) {
        res.status(500).json({message: 'internal server error'});
    }

}

/**
 * 
 *  Endpoint to get reviews by type
 * 
 *  @returns reviews
 */
const getReviewsByType = async (req, res) => {

    try {
        const {type} = req.params;
        const reviews =  await Review.find({type});

        res.status(200).json({reviews});
        
    } catch (err) {
        res.status(500).json({message: 'internal server error'});
    }
}

/**
 * 
 *  Endpoint to delete a review
 *  
 * @returns  json with the answe
 */
const deleteReview = async (req, res) => {

    const {id} = req.params;
    const reviewExist = await Review.findById(id);

    if(!reviewExist) 
        return res.status(404).json({error: 'The review does not exist'});
    
    try {
        
        await reviewExist.deleteOne();
        return res.status(200).json({message: 'The review was successfully deleted'});

    } catch (err) {
        res.status(500).json({message: 'internal server error'});
    }
}

/**
 * 
 *  Endpoint to update a review
 * 
 * @returns the review updated
 */
const updateReview = async (req, res) => {
    const result = validatePartialReview(req.body);
    if(result.error) 
        return res.status(400).json({Error: JSON.parse(result.error.message)});

    const {id} = req.params;

    try {

        const reviewExist = await Review.findByIdAndUpdate(id, req.body,{
            new: true
        });

        if(!reviewExist)
            return res.status(404).json({error: 'The review does not exist'});


        res.status(200).json(reviewExist);
        
    } catch (err) {
        res.status(500).json({message: 'internal server error'});
    }
}



const reviewSchema = z.object({

    name: z.string().max(50),
    year: z.number().gte(1800).lte(2024),
    genre: z.string().max(30),
    director: z.string().max(40),
    rating: z.number().gte(1).lte(5),
    description: z.string().min(10),
    type: z.string()

});

function validateReview(object){
    return reviewSchema.safeParse(object);
}

function validatePartialReview(object){
    return reviewSchema.partial().safeParse(object);
}

export {
    addReview,
    getAllReviews,
    getReviewsByType,
    deleteReview,
    updateReview
}