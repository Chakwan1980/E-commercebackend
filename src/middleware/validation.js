import Joi from 'joi';

// Validation scheme for products
const productSchema = Joi.object({
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    product_code: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number().min(0).max(5).default(0),
    image_url: Joi.string().uri().optional(), // Asegúrate de que esto esté permitido
    category: Joi.string().required(),
});

// Middleware to validate products
export const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
