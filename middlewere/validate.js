import z from 'zod';


/**
 * VALIDATE USERS
 */
const userSchema = z.object({
    name: z.string(),
    email: z.string().email('This is not a valid email.'),
    password: z.string().min(2)
})

function validateUser (object){
    return userSchema.safeParse(object);
}

function validatePartialUser (object){
    return userSchema.partial().safeParse(object);
}


/**
 * VALIDATE REVIEWS
 */
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
    validatePartialReview,
    validatePartialUser,
    validateReview, 
    validateUser
}