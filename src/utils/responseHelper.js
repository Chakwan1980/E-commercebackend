// Helper for sending successful responses
export const sendSuccessResponse = (res, data, message = 'Operation successful') => {
    res.status(200).json({
        success: true,
        message,
        data,
    });
};

// Helper for sending error responses
export const sendErrorResponse = (res, message = 'Operation failed', statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};