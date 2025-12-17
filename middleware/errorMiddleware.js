const globalErrorHandler = (err, req, res, next) => {
    console.error("Internal Error Stack:", err.stack);
    
    res.status(err.status || 500).json({
        status: "Error",
        message: err.message || "An unexpected server error occurred."
    });
};

module.exports = globalErrorHandler;