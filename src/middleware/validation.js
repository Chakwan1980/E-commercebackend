import Joi from 'joi';

// Validation scheme for products
const productSchema = Joi.object({
    product_name: Joi.string().min(3).max(255).required(),
    product_description: Joi.string().min(10).max(1000).required(),
    product_code: Joi.string().min(3).max(50).required(),
    price: Joi.number().precision(2).positive().required(),
    rating: Joi.number().min(0).max(5).optional(),
});

// Middleware to validate products
export const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};